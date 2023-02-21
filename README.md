# This is an API for the WSU Arboretum website. It formats XML to JSON

## Author
Praise Chinedu-Eneh

### About this API
Like the title above, this is an API for the WSU Arboretum.
It formats XML to JSON.
It also makes use of the Arboretum XML file link to the trees so the objects are direct outputs from the XML file format.

### How to use this API

This API consists of two main routes

*/tree/getAllTrees

*/tree/getOneTree?id='some_id_number'

### Response Objects

#### When using the /tree/getOneTree route, 
you must provide an id number with the query key 'id'. The following json object will be returned:__

entityID: integer
displayName: string
geoLocation: string
description: string
defaultImagePath: string
attributeValues: array of objects [
    {
        entityid,
        attributeName,
        attributeValue,
        attributeType,
    }
]
locations: array of objects [
    {
        locationId, 
        entityId, 
        entityName, 
        entityType, 
        geoLocation, 
        isDefaultLocation
    }
]
resources: array of objects [
    {
        resourceId,
        resourcetypeId,
        resourceType,
        entityID,
        description,
        isDefault,
        path
    }
]

##### Example Response

{
  "entityId": 3,
  "displayName": "Austrian Pine",
  "geoLocation": "[{\"Lat\":\"44.047318\",\"Lng\":\"-91.644497\"}]",
  "description": "The Austrian Pine, sometimes called the European Black Pine, has been planted in parks, residential landscapes, and in farm windbreaks across the United States. In some parts of the country it ...",
  "defaultImagePath": "https://w3.winona.edu/Locations/Resources/AustrianPine.png",
  "attributeValues": [
    {
      "entitiyId": 3,
      "attributeName": "Common Name",
      "attributeValue": "Austrian Pine",
      "attributeType": "Text"
    },
    {
      ...
    },
    ...
  ],
  "locations": [
    {
      "locationId": 131,
      "entityId": 3,
      "entityName": "Austrian Pine",
      "entityType": "Tree",
      "geoLocation": "[{\"Lat\":\"44.047318\",\"Lng\":\"-91.644497\"}]",
      "isDefaultLocation": true
    },
    {
        ...
    },
    ...
  ],
  "resources": [
    {
      "resourceId": 9,
      "resourceTypeId": 1,
      "resourceType": "Image",
      "entityId": 3,
      "description": "Austrian Pine",
      "isDefault": true,
      "path": "https://w3.winona.edu/Locations/Resources/AustrianPine.png"
    },
    {
        ...
    },
    ...
  ]
}


#### When using the /tree/getAllTrees route, 
There is no required configuration. Just call the route.
The response object returned will be an array of objects in the following format:

[
  {
    "id": 1,
    "name": "American Chestnut"
  },
  {
    "id": 2,
    "name": "Amur Corktree"
  },
  {
    ...
  },
  ...
]

This can be useful to have a local instance of a name to id mapping for quicker querying and retrieval.