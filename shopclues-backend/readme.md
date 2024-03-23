
================================ Products Routes ===============================================================

/******* GET all Products ******************/

GET =>  http://localhost:3001/products

Using filters

page = 1
GET http://localhost:3001/products?page=4

limit = 2
GET http://localhost:3001/products?limit=5

search = producttitle and product product desc based search
GET http://localhost:3001/products?search=backup


/** GET Products of specific category ***/

PASS category in param.

GET  =>  http://localhost:3001/products/category/65d0d5556e47f10d5810ae67
Using filters

page = 1
GET http://localhost:3001/products/category/65d0d5556e47f10d5810ae67?page=4

limit = 4
GET http://localhost:3001/products/category/65d0d5556e47f10d5810ae67?limit=4


=================================== Categories Routes ==================================================

/******* GET All Categories ******************/

GET => http://localhost:3001/category


/******* GET Specific Category ******************/

GET => http://localhost:3001/category/65f6b447f46dcdb982d58e2d



