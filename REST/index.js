//jtmorris-me Restful api created by Jordan morris: Github.com:/jtmorris-gamedev
// the api version is v1
/*
    here is the following current definition for api v1:
    the api should be accessed by navigating to /api.
    the api routes should look like the following:
    
    /api/version/httpmethod/resource/searchBy/attribute?specificInfoToQuery

    where:
    /api = api root
    /api/version = the api version
    /api/version/httpmethod = the http method to use: get, post, put, etc

    /api/version/httpmethod/resource = the resoucre to access
    /api/version/httpmethod/resource/searchby = how will i search for the resource?
    /api/version/httpmethod/resource/searchby/attribute = the attribute to search for in the requested resource
    /api/version/httpmethod/resource/searchby/attribute ?specificInfoToQuery = query string should ask for more specific information or return everything if omitted

    ------------------------------------------------------------------------------------------------
    the following should be the be behavior of the api

    version: 
        -if version is not specified, return a error,
        -if version specified is not a valid api version, return an invalid api version error
        -if something goes wrong retrieving the api version, return a server error with error information
    
    http methods:
        currently the methods i want to support are the following
            -GET
                if client attempts to athenticate using a get request, then return a 403 forbidden or json with status code and error
                *get requests should only be used to ask for information. they should not be used to send sensitive information such as usernames and passwords

            -POST:

             if using authenticaton, i want to use POST to do so for security purposes.
             if the client attempts to authenticate 

        if any other method request is used return a 405 method not allowed response



    resource list:
        the current list of resources that should be availible are the following:

        /api/: version 1 only as api/v1
        /api/resource/:
            -/pages/
            -/pages/
            -/pages/ID
            -/pages/name

            -disallow /pages/title maybe?
            -/projects/:page ==the list 
            -/nav/
            -/auth/
    
    attribute list: 
        the current list of attributes that can be searched is defined in the mongoose page schema
        in the folder //mean-app/server/database/schemas/


    





http status list
1×× Informational
100 Continue
101 Switching Protocols
102 Processing

2×× Success
200 OK
201 Created
202 Accepted
203 Non-authoritative Information
204 No Content
205 Reset Content
206 Partial Content
207 Multi-Status
208 Already Reported
226 IM Used

3×× Redirection
300 Multiple Choices
301 Moved Permanently
302 Found
303 See Other
304 Not Modified
305 Use Proxy
307 Temporary Redirect
308 Permanent Redirect

4×× Client Error
400 Bad Request
401 Unauthorized
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
409 Conflict
410 Gone
411 Length Required
412 Precondition Failed
413 Payload Too Large
414 Request-URI Too Long
415 Unsupported Media Type
416 Requested Range Not Satisfiable
417 Expectation Failed
418 I'm a teapot
421 Misdirected Request
422 Unprocessable Entity
423 Locked
424 Failed Dependency
426 Upgrade Required
428 Precondition Required
429 Too Many Requests
431 Request Header Fields Too Large
444 Connection Closed Without Response
451 Unavailable For Legal Reasons
499 Client Closed Request

5×× Server Error
500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
505 HTTP Version Not Supported
506 Variant Also Negotiates
507 Insufficient Storage
508 Loop Detected
510 Not Extended
511 Network Authentication Required
599 Network Connect Timeout Error





*/


//implement crud operations and

var restApi = {}

//restapi.create should require authorization and use POST to create
restApi.create = function(){

}
//restapi.create should only require authorization if the information being accessed is sensitive data like user information
restApi.read = function(){
    //if information to read is sensitive information, require authorization
}
//restapi.update should require authorization and use POST for security.
restApi.update = function(){

}