exports.seed = function(knex) {
  return knex('trips').insert([
    {id: 1, guide_id: 1, title:"Excursion to Amazonas", description:"Something here", professional:0, type_id: 1, duration: 25, date: "05/28/2009"},
    {id: 2, guide_id: 2, title:"Visiting Paris", description:"Something here", professional:1, type_id: 4, duration: 12, date: "07/15/20011"},
    {id: 3, guide_id: 3, title:"Caribean Cruise", description:"Something here", professional:0, type_id: 2, duration: 23, date: "08/2/2012"},
    {id: 4, guide_id: 4, title:"Hiking the Kilimanharo", description:"Something here", professional:0, type_id: 3, duration: 10, date: "06/14/2015"}
]);
};