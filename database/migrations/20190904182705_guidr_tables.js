exports.up = function(knex) {
    return (knex.schema
      .createTable('guides', tbl => {
          tbl.increments('id');
          tbl.string('username', 255).unique().notNullable();
          tbl.string('password').notNullable();
          tbl.string('tagline', 128);
          tbl.integer('age');
          tbl.integer('experience');
      })

      .createTable('types', tbl => {
        tbl.increments('id');
        tbl.string('type' , 100)
            .notNullable();
        tbl.string('description', 128);
    })
      .createTable('trips', tbl => {
          tbl.increments('id');
          tbl.integer('guide_id')
              .unsigned()
              .notNullable()
              .references('id').inTable('guides')
              .onDelete('RESTRICT')
              .onUpdate('CASCADE');
          tbl.string('title', 128).notNullable();
          tbl.string('description').notNullable();
          tbl.boolean('professional').notNullable();
          tbl.integer('type_id')            
             .unsigned()
             .notNullable()
             .references('id').inTable('types')
             .onDelete('RESTRICT')
             .onUpdate('CASCADE');;
          tbl.integer('duration')
             .unsigned()
             .notNullable();
          tbl.date('date').notNullable();   
      })

    );
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('trips')
      .dropTableIfExists('types')
      .dropTableIfExists('guides')
  };