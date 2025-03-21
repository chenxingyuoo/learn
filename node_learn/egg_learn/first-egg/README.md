# first-egg

## Development

```bash
# install dependencies
npm install
# start
npm run dev

# generate migration file
npx sequelize migration:generate
# migrate up
npx sequelize db:migrate
# migrate up for test database
NODE_ENV=test npx sequelize db:migrate
# migrate down
npx sequelize db:migrate:undo
npx sequelize db:migrate:undo:all
# migrate down for test database
NODE_ENV=test npx sequelize db:migrate:undo
NODE_ENV=test npx sequelize db:migrate:undo:all

# run migration and test, for CI environment
npm run ci
```

## Documents

[eggjs sequelize document](https://eggjs.org/zh-cn/tutorials/mysql.html)
[egg-sequelize](https://github.com/eggjs/egg-sequelize)
[sequelize](http://docs.sequelizejs.com)
[sequelize-cli and migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html)
[factory-girl](https://github.com/aexmachina/factory-girl)
