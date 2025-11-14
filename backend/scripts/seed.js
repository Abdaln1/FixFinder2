/*
  Simple seed script to create demo users and jobs.
  Usage: from `backend` folder: `node scripts/seed.js`
*/
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const User = require('../src/models/User')
const Job = require('../src/models/Job')

async function main(){
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/fixfinder'
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('Connected to', uri)

  // clear
  await User.deleteMany({})
  await Job.deleteMany({})

  // create users
  const alice = new User({ name: 'Alice', email: 'alice@example.com', isHelper: false })
  const bob = new User({ name: 'Bob', email: 'bob@example.com', isHelper: true, services: ['flytting','montering'] })
  // set a default password for demo users: password123
  const bcrypt = require('bcryptjs')
  const salt = await bcrypt.genSalt(10)
  alice.passwordHash = await bcrypt.hash('password123', salt)
  bob.passwordHash = await bcrypt.hash('password123', salt)
  await alice.save()
  await bob.save()

  const jobs = [
    { title: 'Flyttehjelp — 1 sofa', description: 'Trenger hjelp med å bære en sofa i 3. etg (ingen heis)', price: 600, createdBy: alice._id },
    { title: 'Klippe gress', description: 'Liten plen, ca 50m2', price: 250, createdBy: alice._id },
    { title: 'Montere TV', description: 'Skru opp TV og skjule kabler', price: 400, createdBy: alice._id }
  ]

  for(const j of jobs){
    const job = new Job(j)
    await job.save()
  }

  console.log('Seed complete: users and jobs created')
  process.exit(0)
}

main().catch(err=>{ console.error(err); process.exit(1) })
