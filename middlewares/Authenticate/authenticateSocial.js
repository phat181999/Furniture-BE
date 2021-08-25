const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const authenSocial = async (req, res, next) => 
{

    const { user } = req.body;
    const { fullname, account, password, type, image } = user;
    const userCheck = await User.findOne({
        where: {
            account,
        },
    });

    if (!userCheck)
    {

        try
        {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            await User.create({
                fullname,
                account,
                email:account,
                avatar: image,
                password: hashPassword,
                type
            });
            req.body = { account, password }
            return next();
        } catch (err)
        {
            res.status(500).send(err);
            console.log(err);
        }
    } else
    {
        req.body = { account, password }
        return next();
    }
};

module.exports = { authenSocial }
