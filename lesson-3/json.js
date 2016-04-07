var dict = {
    name: "Popo",
    age: 18,
    address: 'LiShuiqiao'
};
object = JSON.stringify(dict)
console.log(typeof(object) + ' ' + object);
json_object = JSON.parse(object);
console.log(typeof(json_object) + " " + json_object);

