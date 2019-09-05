exports.up = function(knex) {
    return (knex.schema
      .createTable('guides', tbl => {
          tbl.increments('id');
          tbl.string('name', 128).notNullable().unique();
          tbl.string('password').notNullable();

      })
      .createTable('trips', tbl => {
          tbl.increments('id');
          tbl.integer('guide_id')
              .unsigned()
              .notNullable()
              .references('id').inTable('users');
          tbl.string('title', 128).notNullable();
          tbl.string('description').notNullable();
          tbl.integer('type_id')
             .unsigned()
             .notNullable()
             .references('id').inTable('types');
          tbl.integer('duration')
             .unsigned()
             .notNullable();
             
           //MISSING DATE
      })

      .createTable('types', tbl => {
          tbl.increments('id');
          tbl.string('type')
              .notNullable()
          tbl.string('description', 128)
      })

      );
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('types')
      .dropTableIfExists('trips')
      .dropTableIfExists('users')
  };