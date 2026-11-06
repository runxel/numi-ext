// Find nett of gross amount including tax

// Function to find the nett figure of a gross input amount
numi.addFunction({ "id" : "nett", "phrases" : "nett" }, function(values) {
    
    // default tax amount
    var vat = values[1]?.double ?? 19;
    
    return { "double": (values[0].double/(vat+100)) * 100 };

});

