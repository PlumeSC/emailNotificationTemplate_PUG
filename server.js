const express = require(`express`);
const app = express();
const moment = require(`moment`)

const { Resend } = require(`resend`);

app.set(`view engine`,`pug`)
const user = {
    name:`john Doe`,
    date:moment().format('MMMM Do yyyy, h:mm:ss a'),
    order:1587648,
    img:`https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80`,
    description:`Size: 32X30 Athletic`,
    price:250,
    time:8,
}

app.get(`/order`, async (req, res, next) => {
    try {
        res.render('./order', { 
            title: 'Thank you', 
            header: user.name,
            // header: `Thank you for your order, ${user.name}`,
            date:user.date,
            orderNo:user.order,
            img:user.img,
            perday:user.price,
            time:user.time,
            // total: `฿ ${user.price*user.time}`,
            // disposit: `฿ ${user.price*user.time*0.3}`,
            // totalPrice:`฿ ${user.price*user.time*1.3}`
        }, async (err, html) => {
            if (err) {
                return next(err);
            }
            
            const resend = new Resend("re_gewDnB4G_GiZB7QiuDx6nquiXV81WtERW");
            const data = await resend.emails.send({
                "to": ["supawit.chukiat@gmail.com"],
                "from": "onboarding@resend.dev",
                "html": html,
                "text": `This is TEXT`,
                "subject": "THIS IS SUBJECT"
            });

            res.status(200).json({ message: "done" });
        });
    } catch (error) {
        console.log(error);
    }
});


app.listen(8000, () => console.log(`run`));
