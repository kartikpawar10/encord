const registerButton = document.querySelector("#register");
const loginButton = document.querySelector("#login");
const formDOM = document.querySelector(".form")
const usernameInputDOM = document.querySelector("#username")
const passwordInputDOM = document.querySelector("#useremail")
const useremailInputDOM = document.querySelector("#userpassword")
formDOM.addEventListener('submit', async (e) => {
    console.log('a')
    e.preventDefault()
    const name = usernameInputDOM.value
    const password = passwordInputDOM.value
    const email = useremailInputDOM.value
  
    try {
      const { data } = await axios.post('/api/v1/register', { name,email,password})
      usernameInputDOM.value = ''
      passwordInputDOM.value = ''
      console.log(data)
      localStorage.setItem('token', data.token)
    } catch (error) {
        console.log(error)
      localStorage.removeItem('token')
    }
    setTimeout(() => {
      formAlertDOM.style.display = 'none'
    }, 2000)
  })
  