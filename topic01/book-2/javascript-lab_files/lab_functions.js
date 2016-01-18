var aCar = {
	owner : 'Joe Bloggs',
	address : '3 Walkers Lane',
    previous_owners : [ { name : 'Pat Smith', address : '1 Main Street'}, 
                        { name : 'Sheila Dwyer', address : '2 High Street'}],
	type : {
		make : 'Toyota',
		model : 'Corolla',
		cc : 1.8
	},
	features : ['Parking assist', 'Alarm', 'Tow-bar'],
	registration : {year : 10, county : 'WD', number : 1058}
}

aCar.mileage = 80000
aCar.color = { exterior : 'red', 
               interior : { texture : 'leather', shade : 'cream' } 
             }
             


//Start of Lab 2
  var addPreviousOwner = function(car,p_name,p_address) {
           var o = { name : p_name, address : p_address }
           car.previous_owners.push(o)
     }


  addPreviousOwner(aCar,'Jim Nugent','3 Lower Road')
  console.log(aCar.previous_owners[aCar.previous_owners.length - 1].name)

   addPreviousOwner(aCar,'Rachel Fleming','4 Upper Road')
     console.log(aCar.previous_owners[2].name)
     console.log(aCar.previous_owners[0].name)