// Main logic of the application

// 1-293 is the index range for the trees
// Blanks at 47-90, 179-230, 170, 276
// Flowers at 174-178, 232-269,  
const axios = require('axios');
const puppeteer = require('puppeteer');

const START = 1;
const END = 293;
const FLOWERSTART1=169
const FLOWEREND1=171
const FLOWERSTART2 = 174
const FLOWEREND2 = 178
const FLOWERSTART3 = 232
const FLOWEREND3 = 269
const memoization = {trees: [], id: null, entity: null};

const scrape = async (id) => {
    const url = new URL(`https://www2.winona.edu/m/arboretum/about.asp?e=${id}&t=1`);
    const browser = await puppeteer.launch({headless: true});
    const context = browser.defaultBrowserContext();
    await context.clearPermissionOverrides();
    const page = await browser.newPage();
    page.on('dialog', async dialog => {
        await dialog.accept();
    });
    try {
        await page.goto(url, { waitUntil: 'load', timeout: 50000 });
    } catch (error) {
        console.log(error);
        return;
    }
    await page.screenshot({path: '1.png'});
    const data = await page.evaluate(() => {
        const title = document.getElementsByClassName('ui-title')[0].textContent;
        const description = document.getElementById('aboutContent').children[0].textContent;
        let details = [];
        const audioHeader = document.getElementsByTagName('dl')[0].children.item(0).textContent;
        const audioSource = document.getElementsByTagName('source')[0].src;
        details.push({audioHeader, audioSource});
        for (let i=2; i<=document.getElementsByTagName('dl')[0].children.length-1; i++) {
            let header = document.getElementsByTagName('dl')[0].children.item(i).textContent;
            let text = document.getElementsByTagName('dl')[0].children.item(i+1).textContent;
            let obj = {header,text}
            details.push(obj);
            i=i+1
        }

        let images = [];
        for (let i = 0; i < document.getElementsByClassName('ui-link').length; i++) {
            const img = document.getElementsByClassName('ui-link').item(i).href;
            images.push({img});
        }
        return {title, description, details, images};
    });
    await browser.close();
    return data;
}

const scrapeAll = async () => {
    let trees = [];

    const browser = await puppeteer.launch({headless: true});
    const context = browser.defaultBrowserContext();
    await context.clearPermissionOverrides();
    const page = await browser.newPage();
    page.on('dialog', async dialog => {
        await dialog.accept();
    });
    for (var i = 1; i <= END; i++) {
        if(i >= FLOWERSTART1 && i <= FLOWEREND1 || i >= FLOWERSTART2 && i <= FLOWEREND2 || i >= FLOWERSTART3 && i <= FLOWEREND3) {
            continue;
        }
        const url = new URL(`https://www2.winona.edu/m/arboretum/about.asp?e=${i}&t=1`);
        try {
            await page.goto(url, { waitUntil: 'load', timeout: 50000 });
        } catch (error) {
            console.log(error);
            continue;
        }
        const data = await page.evaluate(() => {
            const name = document.getElementsByClassName('ui-title')[0].textContent;
            return name;
        })
        if (data) {
            dataname = data;
            id = url.searchParams.get('e');
            
            trees.push({ id, dataname})
        }
    }
    return trees;
}

const getOneTree = async (id) => {
    try {
        const json = await axios.get(`https://w3.winona.edu/locations/api/Entities/${id}`)
        return json.data;
    } catch (error) {
        console.log(error);
    }
}

const getAllTrees = async () => {
    let trees = []
    for (var i = 1; i <= END; i++) {
        if(i >= FLOWERSTART1 && i <= FLOWEREND1 || i >= FLOWERSTART2 && i <= FLOWEREND2 || i >= FLOWERSTART3 && i <= FLOWEREND3) {
            continue;
        }
        try {
            const json = await axios.get(`https://w3.winona.edu/locations/api/Entities/${i}`)
            if (!json.data){
                continue;
            }
            trees.push({id:json.data.entityId, name:json.data.displayName})
        } catch (error) {
            console.log(error);
            console.log(i)
        }
    }
    return trees;
}

// memoize the results, maybe update that memoization once a day 
// or set a flag that indicates it needs to be updated
const handleGetOneTree = async (req, res) => {
    if(memoization.id == req.query.id){
        res.send(memoization.entity)
    }else {
        memoization.id = req.query.id
        memoization.entity = await getOneTree(req.query.id)
        res.send(memoization.entity)
    }
}

const handleGetAllTrees = async (req, res) => {
    if(memoization.trees.length > 0) {
        res.send(memoization.trees)
    }
    else{
        memoization.trees = await getAllTrees();
        res.send(memoization.trees);
    }
}

module.exports = {handleGetOneTree, handleGetAllTrees};