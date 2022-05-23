const sports = [
    {
        id:1,
        sportName:"football",
        "updatedAt": "2022-04-20T14:17:26.948Z",
        "createdAt": "2022-04-20T14:17:26.858Z",
    },
    {
        id:2,
        sportName:"basketball",
        "updatedAt": "2022-04-20T14:17:26.948Z",
        "createdAt": "2022-04-20T14:17:26.858Z",
    },
    {
        id:3,
        sportName:"hockey",
        "updatedAt": "2022-04-20T14:17:26.948Z",
        "createdAt": "2022-04-20T14:17:26.858Z",
    },
    {
        id:4,
        sportName:"chess",
        "updatedAt": "2022-04-20T14:17:26.948Z",
        "createdAt": "2022-04-20T14:17:26.858Z",
    },
    {
        id:5,
        sportName:"swimming",
        "updatedAt": "2022-04-20T14:17:26.948Z",
        "createdAt": "2022-04-20T14:17:26.858Z",
    },
    {
        id:6,
        sportName:"horse",
        "updatedAt": "2022-04-20T14:17:26.948Z",
        "createdAt": "2022-04-20T14:17:26.858Z",
    }
]

const users = [
    {
        firstName: "Vahe",
        lastName: "Vahe",
        email: "Vahe",
        telegram:"Vahe",
        whatsapp:"Vahe",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_a4ESrgV1fyKimFM4LDdSFJodqGzUDlLaPA&usqp=CAU",
        address1:"Vahe",
        address2:"Vahe",
        facebook:"Vahe",
        tiktok:"Vahe",
        instagram:"Vahe",
        linkedin:"Vahe",
        youtube:"Vahe",
        token:"Vahe",
        userSport_id:1,
        "updatedAt": "2022-04-20T14:17:26.948Z",
        "createdAt": "2022-04-20T14:17:26.858Z",
    },
    {
        firstName: "Gago",
        lastName: "Gago",
        email: "Gago",
        telegram:"Gago",
        whatsapp:"Gago",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRavIqQYivR75p5gMVUiR_tZqoGzmqIVGbXRw&usqp=CAU",
        address1:"Gago",
        address2:"Gago",
        facebook:"Gago",
        tiktok:"Gago",
        instagram:"Gago",
        linkedin:"Gago",
        youtube:"Gago",
        token:"Gago",
        userSport_id:2,
        "updatedAt": "2022-04-20T14:17:26.948Z",
        "createdAt": "2022-04-20T14:17:26.858Z",
    },
    {
        firstName: "Vacho",
        lastName: "Vacho",
        email: "Vacho",
        telegram:"Vacho",
        whatsapp:"Vacho",
        image:"https://www.nicepng.com/maxp/u2w7w7o0u2r5q8t4/",
        address1:"Vacho",
        address2:"Vacho",
        facebook:"Vacho",
        tiktok:"Vacho",
        instagram:"Vacho",
        linkedin:"Vacho",
        youtube:"Vacho",
        token:"Vacho",
        userSport_id:2,
        "updatedAt": "2022-04-20T14:17:26.948Z",
        "createdAt": "2022-04-20T14:17:26.858Z",
    }
]

const usersSports = [
    {
        userId: 1,
        sportId:"1",
        "updatedAt": "2022-04-20T14:17:26.948Z",
        "createdAt": "2022-04-20T14:17:26.858Z",
    },
    {
        userId: 1,
        sportId:2,
        "updatedAt": "2022-04-20T14:17:26.948Z",
        "createdAt": "2022-04-20T14:17:26.858Z",
    },
    {
        userId: 1,
        sportId:3,
        "updatedAt": "2022-04-20T14:17:26.948Z",
        "createdAt": "2022-04-20T14:17:26.858Z",
    },
    {
        userId: 1,
        sportId:4,
        "updatedAt": "2022-04-20T14:17:26.948Z",
        "createdAt": "2022-04-20T14:17:26.858Z",
    }
]

const verificationText = "Your verification code "

const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
module.exports = {
    sports,
    users,
    usersSports,
    verificationText,
    characters
}