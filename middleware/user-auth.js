export  default async function ({ $auth, redirect }) {
  const user = $auth.$state.user;



  if (user){
    redirect('/')
  } {
    redirect('/login')
  }
}
