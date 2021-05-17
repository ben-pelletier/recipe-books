import Vue from 'vue'

var faunadb = require('faunadb')
Vue.prototype.$q = faunadb.query
Vue.prototype.$db = new faunadb.Client({ secret: process.env.FAUNA_SERVER_KEY })

/* const getBooks = await client.query(
  q.Map(
    q.Paginate(
      q.Match(q.Index("allbooks"))
    ),
    q.Lambda("X", q.Get(q.Var("X")))
  )
)
console.log(getBooks.data.length)
for (let i = 0; i < getBooks.data.length; i++) {
  console.log(getBooks.data[i].data.title)
}*/

