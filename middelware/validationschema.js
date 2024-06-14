const { body}=require('express-validator');
const validationUserSchema=()=>{
    return[body('firstName').notEmpty().withMessage("the firstname is required"),
        body('lastName').notEmpty().withMessage("the lastName is required"),
        body('email').notEmpty().withMessage("the email is required"),
        body('password').notEmpty().withMessage("the password is required"),
        body('role').notEmpty().withMessage("the role is required")
        
    ]
}
const validationBookschema= ()=>{
    return[body('name').notEmpty().withMessage("the name is required"),
        body('author').notEmpty().withMessage("the author is required"),
        body('rate').notEmpty().withMessage("the rate is required"),
        body('genre').notEmpty().withMessage("the genre is required"),
        body('count').notEmpty().withMessage("the count is required")

        ]
}
module.exports={validationUserSchema,validationBookschema};