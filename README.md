# API for the WSU Arboretum website.

## Author
Praise Chinedu-Eneh

### About this API
Like the title above, this is an API for the WSU Arboretum.
It formats XML to JSON.
It also makes use of the Arboretum XML file link to the trees so the objects are direct outputs from the XML file format.

### API Link


-https://wsuarboretumnodeapi.onrender.com/

### How to use this API

**This API consists of these main routes**

*/tree/getAllTrees - Get a list of all the trees ***this does take some time*** on the first request but then caches for quicker response on subsequent requests

*/tree/getOneTree?id=some_id_number - Get a single tree

*/tree/getTreeTour - Get a list of trees available for the tour

*/root/getTours - Get a list of each available tour

*/root/getTour?id=some_id_number - Get one of the available tours

**The following subroutes**

*/help - View the documentation/source code

*/ - Guide route

### Response Objects

#### When using the /tree/getOneTree route, 
you must provide an id number with the query key 'id'. The following json object will be returned:  

entityID: integer  
displayName: string  
geoLocation: string  
description: string  
defaultImagePath: string  
attributeValues: array of objects [  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;entityid,  
&nbsp;&nbsp;&nbsp;attributeName,  
&nbsp;&nbsp;&nbsp;attributeValue,  
&nbsp;&nbsp;&nbsp;attributeType,  
&nbsp;&nbsp;}  
]  
locations: array of objects [  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;locationId,   
&nbsp;&nbsp;&nbsp;entityId,  
&nbsp;&nbsp;&nbsp;entityName,   
&nbsp;&nbsp;&nbsp;entityType,  
&nbsp;&nbsp;&nbsp;geoLocation,  
&nbsp;&nbsp;&nbsp;isDefaultLocation  
&nbsp;&nbsp;}  
]  
resources: array of objects [  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;resourceId,  
&nbsp;&nbsp;&nbsp;resourcetypeId,  
&nbsp;&nbsp;&nbsp;resourceType,  
&nbsp;&nbsp;&nbsp;entityID,  
&nbsp;&nbsp;&nbsp;description,  
&nbsp;&nbsp;&nbsp;isDefault,  
&nbsp;&nbsp;&nbsp;path  
&nbsp;&nbsp;}  
]  

##### Example Response

{  
&nbsp;&nbsp;&nbsp;"entityId": 3,  
&nbsp;&nbsp;&nbsp;"displayName": "Austrian Pine",  
&nbsp;&nbsp;&nbsp;"geoLocation": "[{\"Lat\":\"44.047318\",\"Lng\":\"-91.644497\"}]",  
&nbsp;&nbsp;&nbsp;"description": "The Austrian Pine, sometimes called the European Black Pine, has been planted in parks, residential landscapes, and in farm windbreaks across the United States. In some parts of the country it ...",  
&nbsp;&nbsp;&nbsp;"defaultImagePath": "https://w3.winona.edu/Locations/Resources/AustrianPine.png",  
&nbsp;&nbsp;&nbsp;"attributeValues": [  
&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"entitiyId": 3,  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"attributeName": "Common Name",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"attributeValue": "Austrian Pine",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"attributeType": "Text"  
&nbsp;&nbsp;&nbsp;},  
&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
&nbsp;&nbsp;&nbsp;},  
&nbsp;&nbsp;&nbsp;...  
&nbsp;&nbsp;],  
&nbsp;&nbsp;&nbsp;"locations": [  
&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"locationId": 131,  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"entityId": 3,  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"entityName": "Austrian Pine",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"entityType": "Tree",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"geoLocation": "[{\"Lat\":\"44.047318\",\"Lng\":\"-91.644497\"}]",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"isDefaultLocation": true  
&nbsp;&nbsp;&nbsp;},  
&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
&nbsp;&nbsp;&nbsp;},  
&nbsp;&nbsp;&nbsp;...  
&nbsp;&nbsp;],  
&nbsp;&nbsp;&nbsp;"resources": [  
&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"resourceId": 9,  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"resourceTypeId": 1,  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"resourceType": "Image",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"entityId": 3,  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"description": "Austrian Pine",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"isDefault": true,  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"path": "https://w3.winona.edu/Locations/Resources/AustrianPine.png"  
&nbsp;&nbsp;&nbsp;},  
&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
&nbsp;&nbsp;&nbsp;},  
&nbsp;&nbsp;&nbsp;...  
&nbsp;&nbsp;]  
}  


#### When using the /tree/getAllTrees route, 
There is no required configuration. Just call the route.  
The response object returned will be an array of objects in the following format:  

[  
&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 1,  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "American Chestnut"  
&nbsp;&nbsp;&nbsp;},  
&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 2,  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "Amur Corktree"  
&nbsp;&nbsp;&nbsp;},  
&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
&nbsp;&nbsp;&nbsp;},  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
]  

This can be useful to have a local instance of a name to id mapping for quicker querying and retrieval.