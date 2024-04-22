## To do
* Log out
* localhost:5173 default link has to be **/iniciar_sesion** if is not logged and if is already logged has to be **/inicio**

* Sending role in response body and revalidating: As you suggested, you can send the role in the response body after a successful login. On the client side, you can store this role information in a state variable or some kind of in-memory storage and use it to control the rendering of your components. However, when it comes to making requests that depend on the user's role (like accessing a certain API endpoint), you should revalidate this role on the server side. In other words, do not trust the client to honestly tell you their role when performing actions - check their role based on their authentication on the server side.

* ProtectedRoutes check the list of roles, then check the role of the user both with endpoints on the API. After checking the role of the user ex if the user is a company and has the company role then let them access to the Link/Component.