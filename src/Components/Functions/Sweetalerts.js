import Swal from 'sweetalert2'
import './Sweetalerts.scss'

// START AUTH
const pleaseSignIn = Swal.mixin({
    title: 'Error',
    text: 'Please log in.'
});
// const authSuccess = Swal.mixin({
//     icon: 'success',
//     // title: "Signed in successfully.",
//     toast: true,
//     position: 'top-end',
//     showConfirmButton: false,
//     timer: 5000,
//     timerProgressBar: true,
//     onOpen: (toast) => {
//         toast.addEventListener('mouseenter', Swal.stopTimer)
//         toast.addEventListener('mouseleave', Swal.resumeTimer)
//     }
// })
// const errorLogin = Swal.mixin({
//     icon: 'error',
//     title: 'Error',
// })
// END AUTH

// START ADD
// const addedSuccess = Swal.mixin({
//     icon: 'success',
//     toast: true,
//     position: 'top-end',
//     showConfirmButton: false,
//     timer: 10000,
//     timerProgressBar: true,
//     onOpen: (toast) => {
//         toast.addEventListener('mouseenter', Swal.stopTimer)
//         toast.addEventListener('mouseleave', Swal.resumeTimer)
//     }
// })
// const errorAdding = Swal.mixin({
//     icon: 'error',
//     title: 'Error',
// })
// const confirmAdd = Swal.mixin({
//     title: 'Confirm Add',
//     text: "REPLACE ME",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'ADD'
// })
// END ADD

// START DELETE
const confirmDelete = Swal.mixin({
    title: 'Confirm Delete',
    text: "REPLACE ME",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#4caf50',
    confirmButtonText: 'DELETE',    
})
const confirmVoid = Swal.mixin({
    title: 'Confirm Void',
    text: "REPLACE ME",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#4caf50',
    confirmButtonText: 'VOID',    
})
// END DELETE

// START SUCCESS
const success = Swal.mixin({
    icon: 'success',
    toast: true,
    position: 'top-end',
    customClass: {container: 'swal-success-container'},
    showConfirmButton: false,
    timer: 10000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
// END SUCCESS



// START ERROR
// const errorUpdate = Swal.mixin({
//     title: 'Update Error',
//     text: 'An error occurred during update. Please try again, or contact administrator if you continue to see this error.'
// });
// const errorDelete = Swal.mixin({
//     title: 'Delete Error',
//     text: 'An error occurred during deletion. Please try again, or contact administrator if you continue to see this error.'
// });
// END ERROR

//UPDATE

// const update = Swal.mixin({
//     input: 'text',
//     confirmButtonText: 'Next &rarr;',
//     showCancelButton: true,
//     progressSteps: ['1', '2']
// })



export  {
        // authSuccess,
        pleaseSignIn,
        confirmVoid,
        // addedSuccess,
        // errorAdding,
        // confirmAdd,
        // errorLogin,
        confirmDelete,
        success,
        // errorUpdate,
        // errorDelete
    }