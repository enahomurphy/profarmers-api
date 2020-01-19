# Profamers api Service

## Service Features

1. **Users**
    * Crud operation for users
1. **Wishes**
    * Crud operation for wishes
1. **Slots**
    * Crud operation for slots

### Technologies

-----

 1. Nodejs 10+
 1. Postgres
 1. apollo graphql
 1. sequelize ORM
 1. Docker


### How to use

* Clone repository 
* cd into the repo folder folder
* create a .env file for the .env.sample file
* run `docker composer build && docker-compose up`
* make your API calls to `POST localhost:4000/graphql`
* test api on `http:localhost:4000/graphql`

### How to Contribute

* Fork repo to your account
* Clone the repo
* Add a feature and raise a PR to  the base branch
* PR is reviewed and merged



Since Last stand-ups

- Analyse and fix staging slow down
- Fix issue with slack alert crashing on v1
- Started working on validating resource creation & updating validation

Before Last stand-ups

- Continue working on validating resource creation & updating validation

blocker

- None

Learnings

- None

get all topics
 include replies
 sort by replies length
 limit 20