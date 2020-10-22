import React, { useState } from 'react';
import Users from './Users'


const App = () => {
  const [user, setUser] = useState([])
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')

  const btnAuth = () => {
    if (name !== ' ' & name !== '' & name === 'test_super') {
      if (pass.length >= 8 && pass.includes(pass[0].toUpperCase()) && pass.replace(/\D/g, '').length > 0 & pass === 'Nf<U4f<rDbtDxAPn') {
        let token = new Promise((re, reg) => {
          let AuthToken = { username: 'test_super', password: 'Nf<U4f<rDbtDxAPn' }

          fetch('http://emphasoft-test-assignment.herokuapp.com/api-token-auth/', { method: 'POST', body: JSON.stringify(AuthToken), headers: { 'Content-Type': 'application/json' } })
            .then(e => re(e.json()))
            .catch(e => reg(e))
        })

        token.then(e => {
          fetch(`http://emphasoft-test-assignment.herokuapp.com/api/v1/users`, { method: 'GET', headers: { 'Authorization': `Token ${e.token}` } })
            .then(e2 => e2.json())
            .then(e2 => setUser(e2))
            .catch(e2 => console.log(e2))
        })

        document.getElementById('table').style.display = 'table'
        document.getElementById('auth').style.display = 'none'
      }
      else {
        alert('Пароль введён не правильно! Пароль должен быть с заглавной буквы, иметь длину не менее 8 символов, и содержать хотя бы 1 цифру')
      }
    }
    else {
      alert('Пользователь не найден')
    }
  }

  const btnAscending = () => {
    setUser(JSON.parse(JSON.stringify(user.sort((cur, next) => cur.id - next.id))))
  }
  const btnDescending = () => {
    setUser(JSON.parse(JSON.stringify(user.sort((cur, next) => next.id - cur.id))))
  }

  const btnSortAsc = () => {
    setUser(JSON.parse(JSON.stringify(user.sort((cur, next) => cur.username > next.username ? 1 : -1))))
  }
  const btnSortDes = () => {
    setUser(JSON.parse(JSON.stringify(user.sort((cur, next) => cur.username < next.username ? 1 : -1))))

  }

  const btnShow = () => {
    let container = document.getElementById('filters-container')

    if (container.style.display === 'none') {
      container.style.display = 'block'
    }
    else {
      container.style.display = 'none'
    }

  }

  return (
    <>
      <div id='auth' className='Auth'>
        <input placeholder='name' type='text' onChange={e => setName(e.target.value)} />
        <input placeholder='password' type='password' onChange={e => setPass(e.target.value)} />

        <button onClick={() => btnAuth()}>Auth</button>
      </div>


      <table id='table' style={{ display: "none" }}>
        <thead>
          <tr>
            <th>
              id
              <button onClick={() => btnAscending()}>&uarr;</button>
              <button onClick={() => btnDescending()}>&darr;</button>
            </th>
            <th>
              username
              <button onClick={() => btnShow()}>Фильтры</button>

              <div id='filters-container' style={{ display: "none" }}>
                <div>
                  <input type='text' onChange={
                    (e) => setUser(user.filter((v) => {
                      if (v.username.toLocaleLowerCase() === e.target.value.toLocaleLowerCase()) {
                        return v.username += '<--'
                      }
                      else {
                        if (v.username.includes('<--')) {
                          return v.username = v.username.substring(0, v.username.length - 3)
                        }
                        return v.username
                      }
                    }))
                  } />

                  <button onClick={() => btnSortAsc()}>A-Z</button>
                  <button onClick={() => btnSortDes()}>Z-A</button>
                </div>
              </div>
            </th>
            <th>first_name</th>
            <th>last_name</th>
          </tr>
        </thead>

        <tbody>
          {user.map((v, i) => <Users {...v} key={i} />)}
        </tbody>
      </table>
    </>
  );
}

export default App;
