module.exports = {
    isDevelopment : true, // TRUE for development and FALSE for production
    devlopmentToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3ODkwIiwidXNlcl9pZCI6MSwibmFtZSI6IkxhbGl0IFZlcm1hIiwicGhvbmVOdW1iZXIiOiIrOTE3NTI0ODg0NDY2IiwiaW1hZ2VfcGF0aCI6Ii9pbWFnZXMvdXNlci9hZG1pbi5wbmciLCJpYXQiOjE2NTYxODczMzl9.h1i1MSCP5iyEent8od24isRumTetLztiY9SAjdSVl2Q',
    trainerdevlopmentToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN3YXJpdHRAaGVhbGZpdC5pbiIsInBhc3N3b3JkIjoiMTIzNDU2NzgiLCJ1c2VyX2lkIjozLCJuYW1lIjoiU3dhcml0dCIsInBob25lTnVtYmVyIjoiKzkxMDAwMDAwMDAwMCIsImltYWdlX3BhdGgiOiIvaW1hZ2VzL3VwbG9hZHMvMTY2MDYxNzc1NjQ0OC53ZWJwIiwiaWF0IjoxNjYxNjIyOTA5fQ.eulW3LZMeB1KhHgv8gwAdjMix1BSwB3vS4BX44aaYUQ',
    printValue: function (value) {
        if(this.isDevelopment) {
            console.log(value);
        }
    },
    razorpay_key_id: 'rzp_test_q3saAGtqUJ4pbi',
    razorpay_key_secret: 'K10ENcDxn6C8XX5DBYZY1szo',
    devLogoImageUrl: 'http://172.20.10.3:3000/images/local/logo.png',
    prodLogoImageUrl: 'https://healfit.in/images/local/logo.png',
    firebaseWebApiKey: 'BDi-nWqIeoaCHo_N8NTsvsD6XfV9mePAe9GDuvqJkq48J6pqnSrRhMHzMSPP55xUrZM3bFiypqIs0vjlmMaEevo'
}