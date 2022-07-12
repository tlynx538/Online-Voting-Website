/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  for(var i=1;i<10;i++)
  {
    area_code_name_var = String.fromCharCode(i+64) + String.fromCharCode(i+64) + toString(i) + toString(i); //AA11 -> ZZ99
    await knex('area_codes').insert([ { area_code_id: i, area_code_name: area_code_name_var} ]);
  }
};
