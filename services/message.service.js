const wbm = require('wbm');
const Message = require("../models").Messages

const seen = async (messageId) => {
    try {
        const message = await Message.findOne({where: {id: messageId}})
        message.seen = true
        await message.save()
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const whatsappSender = async (number,msg) => {
    try {
        wbm.start({qrCodeData: true, session: false, showBrowser: false}).then(async (qrCodeData) => {
            console.log(qrCodeData); // show data used to generate QR Code
            return qrCodeData;
            await wbm.waitQRCode();
            const phones = [number];
            const message = msg;
            // const message = 'Good Morning.';
            await wbm.send(phones, message);
            await wbm.end();
        }).catch(err => console.log(err));
    } catch (e) {
        console.log('something went wrong', e)
    }
}

module.exports = {
    seen,
    whatsappSender
}