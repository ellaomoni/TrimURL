# TrimURL
Url-shortener project


## API Endpoints

### Auth

POST /auth/register  
POST /auth/login  
GET /auth/me  

### Links

POST /links  
GET /links  
GET /links/:id  
DELETE /links/:id  

### Redirect

GET /links/r/:shortCode  

### Analytics

GET /analytics/:linkId  
