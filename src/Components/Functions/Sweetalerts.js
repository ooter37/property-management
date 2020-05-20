import Swal from 'sweetalert2'

//AUTH
const pleaseSignIn = Swal.mixin({
    title: 'Error',
    text: 'Please log in.'
});
const authSuccess = Swal.mixin({
    icon: 'success',
    // title: "Signed in successfully.",
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    opOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
const errorLogin = Swal.mixin({
    icon: 'error',
    title: 'Error',
})

//ADD
const addedSuccess = Swal.mixin({
    icon: 'success',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 10000,
    timerProgressBar: true,
    opOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
const errorAdding = Swal.mixin({
    icon: 'error',
    title: 'Error',
})
const confirmAdd = Swal.mixin({
    title: 'Confirm Add',
    text: "REPLACE ME",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ADD'
})

//DELETE
const confirmDelete = Swal.mixin({
    title: 'Confirm Delete',
    text: "REPLACE ME",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'DELETE',    
})
const deleteSuccess = Swal.mixin({
    icon: 'success',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 10000,
    timerProgressBar: true,
    opOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

//UPDATE

// const update = Swal.mixin({
//     input: 'text',
//     confirmButtonText: 'Next &rarr;',
//     showCancelButton: true,
//     progressSteps: ['1', '2']
// })



export  {
        authSuccess,
        pleaseSignIn,
        addedSuccess,
        errorAdding,
        confirmAdd,
        errorLogin,
        confirmDelete,
        deleteSuccess,
        

    }