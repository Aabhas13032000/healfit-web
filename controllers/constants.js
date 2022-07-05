module.exports = {
    isDevelopment : true, // TRUE for development and FALSE for production
    devlopmentToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3ODkwIiwidXNlcl9pZCI6MSwibmFtZSI6IkxhbGl0IFZlcm1hIiwicGhvbmVOdW1iZXIiOiIrOTE3NTI0ODg0NDY2IiwiaW1hZ2VfcGF0aCI6Ii9pbWFnZXMvdXNlci9hZG1pbi5wbmciLCJpYXQiOjE2NTYxODczMzl9.h1i1MSCP5iyEent8od24isRumTetLztiY9SAjdSVl2Q',
    printValue: function (value) {
        if(this.isDevelopment) {
            console.log(value);
        }
    }
}