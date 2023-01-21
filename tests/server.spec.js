const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo un Array y status 200 de GET/cafes", async () => {
        const {statusCode: status, body: cafes} = await request(server).get("/cafes").send();
        expect(status).toBe(200);
        expect(cafes).toBeInstanceOf(Array);
    })

    it("Obteniendo statusCode 404 al eliminar un café que no existe DELETE/cafes/:id", async () => {
        const idDelCafeAEliminar = 5;
        const jwt = "token";
        const res = await request(server)
            .delete(`/cafes/${idDelCafeAEliminar}`)
            .set("Authorization", jwt)
            .send();
        const status = res.statusCode;
        expect(status).toBe(404);
    })

   it("Obteniendo un statusCode 201 al enviar un nuevo café para añadir en POST/cafes", async() => {
        const id = Math.floor(Math.random() * 999);
        const cafe = {id, nombre: "Nuevo Café"};  
        const { statusCode: status }  = await request(server)
          .post("/cafes")
          .send(cafe)
        expect(status).toBe(201);
    })
       
    it("Obteniendo un statusCode 400 al enviar un café para editar con req.body.id y req.params.id diferentes en PUT/cafes/:id", async() => {
        const id = 7;
        const idDelCafeAModificar = 5;
         const cafe = {id, nombre: "café modificado"}
         const {statusCode: status} = await request(server)
             .put(`/cafes/${idDelCafeAModificar}`)
             .send(cafe)
         expect(status).toBe(400);
   })
      
});
