// import express from 'express';

// const app = express();
// const port = 3000;

// app.get('/', (req, res) => res.send('hello!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}`))



interface IHomer {
  name(): String;
}


class Homer implements IHomer {
  name() {
      return 'Homer Simpson';
  }
}

const instance = new Homer();
console.log(instance.name());