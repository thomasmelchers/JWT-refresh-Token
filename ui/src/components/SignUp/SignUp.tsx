import React, {useState} from 'react'
import axios from 'axios';

const SignUp = () => {


  const [loginData, setLoginData] = useState<object | string>();


  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      name: {value: string};
    };

    const email = target.email.value;
    const password = target.password.value;
    const name = target.name.value;

    axios
      .post(
        `http://localhost:4000/api/signup`,
        { email, password, name },
        {
          withCredentials: true,
        }
      )
     
      .then((res) => {(res.data.code)? setLoginData('The email is already registred') : setLoginData(res.data)})
      .catch((error) => console.log(error.message));
    }



    
   

  return (
    <div className="App">
      <div className="wrapper">
        <h2>Sign Up</h2>
    
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="name" id="name" placeholder="Jean Dupont" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="jean.dupont@example.com" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="******" />

        {(loginData) &&
        <div className="data">{JSON.stringify(loginData)}</div>}
        
        <button type="submit">Login</button>
      </form>
      </div>
    </div>
  )
}

export default SignUp