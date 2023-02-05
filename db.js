let db = {
    productos: [
        {id: 1, name: "huevo", price: 10, units: 500},
        {id: 2, name: "leche", price: 25, units: 200}
    ],
    usuarios: [
        {id: 1, name: "david", lastname: "zl", email: "david@gmail.com"},
        {id: 2, name: "anita", lastname: "cyz", email: "anita@gmail.com"},
        {id: 3, name: "agro", lastname: "ccd", email: "agro@gmail.com"}
    ],
    providers: [
        {id: 1, name: "mabe", phone: "123456789", email: "contacto@mabe.com"},
        {id: 2, name: "telcel", phone: "2345978899", email: "thelloelcel@telcel.com"},
        {id: 3, name: "pentel", phone: "1238766554", email: "ventaspentel@pentel.com"}
        
    ]
}
//exportar un objeto a otro archivo
    module.exports = db