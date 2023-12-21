# CI/CD

## Commandes CI
- npm run test
- npm run lint

## CD 
lien du livrable docker
https://hub.docker.com/r/sparkew74/api_node

A la création d'un git tag et au git push --tags sur main, création de la release docker hub correspondante

# API_Node

# Sales interaction [/sale]

## Routes : 

You have to login when you want to use this routes

# List of all sales [/sale/list] [GET]

# Get one Sale with id [/sale/:id] [GET]

# Add new Sale [/sale/add] [POST]:

    {
        'mark':String,
        'productImageUrl':(auto implement when youy import image) String,
        'model': String,
        'owner': String,
        seller: (auto implement with your token) ObjectId, 
    }

# Update Sale [/sale/update/:id] [PUT]

# Delete Sale [/sale/delete/:idSale] [DELETE]

# User (Seller) Interaction [/user]

# Register User (add new Seller) [/user/register] [POST] :

    {
        'name':String,
        'firstname': String,
        'email': String,
        'password': String
    }

# Login User (Get the token to access to sale interaction) [/user/login] [POST]:

    {
        'email': String,
        'password': String
    }

    Return 200:

    {
        'token': String,
        'userId': number 
    }

