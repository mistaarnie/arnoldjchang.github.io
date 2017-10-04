$('form#form-request-trade-in-value').validate({
  rules: {
    tbFName: {
      required: true
    },
    tbLName: {
      required: true
    },
    tbAddress: {
      required: true
    },
    tbCity: {
      required: true
    },
    tbState: {
      required: true
    },
    tbZip: {
      required: true
    },
    tbCountry: {
      required: true
    },
    tbPhone: {
      required: true
    },
    tbEmail: {
      required: true,
      email: true
    },
    tbSeries: {
      required: true
    },
    tbModel: {
      required: true
    },
    ddTimeFrame: {
      required: true
    }
  },
  messages: {
    tbFName: "Please provide first name",
    tbLName: "Please provide last name",
    tbemail: {
      required: "Please provide a valid email address",
      email: "name@domain.com format please"
    }
  }
});

jQuery.validator.addMethod("zipcodeUS", function(value, element) {
  return this.optional(element) || /\d{5}-\d{4}$|^\d{5}$/.test(value);
}, "The specified ZIP Code is invalid");

$('form#exclusiveoffers').validate({
  rules: {
    tbname: {
      required: true
    },
    tbemail: {
      required: true,
      email: true
    },
    tbZipCode: {
      required: true,
      zipcodeUS: true
    },
    messages: {
      tbname: "Please specify your name",
      tbemail: {
        required: "Please provide a valid email address",
        email: "name@domain.com format please"
      },
      tbzip: "Please provide a valid Zip Code"

    }
  }
});


$('form#formRequestQoute').validate({
  rules: {
    tbFName: {
      required: true
    },
    tbLName: {
      required: true
    },
    tbAddress: {
      required: true
    },
    tbCity: {
      required: true
    },
    tbState: {
      required: true
    },
    tbZip: {
      required: true
    },
    tbCountry: {
      required: true
    },
    tbPhone: {
      required: true
    },
    tbEmail: {
      required: true,
      email: true
    },
    tbSeries: {
      required: true
    },
    tbModel: {
      required: true
    },
    ddTimeFrame: {
      required: true
    }
  },
  messages: {
    tbFName: "Please provide first name",
    tbLName: "Please provide last name",
    tbemail: {
      required: "Please provide a valid email address",
      email: "name@domain.com format please"
    }
  }
});
$('form#requestABrochure').validate({
  rules: {
    firstname: {
      required: true
    },
    lastname: {
      required: true
    },
    address: {
      required: true
    },
    tbCity: {
      required: true
    },
    tbState: {
      required: true
    },
    tbZip: {
      required: true
    },
    tbCountry: {
      required: true
    },
    tbPhone: {
      required: true
    },
    tbEmail: {
      required: true,
      email: true
    },
    tbSeries: {
      required: true
    },
    tbModel: {
      required: true
    },
    ddTimeFrame: {
      required: true
    }
  },
  messages: {
    tbFName: "Please provide first name",
    tbLName: "Please provide last name",
    tbemail: {
      required: "Please provide a valid email address",
      email: "name@domain.com format please"
    }
  }
});


$('form#form-contact-us').validate({
  rules: {
    tbFName: {
      required: true
    },
    tbLName: {
      required: true
    },
    tbAddress: {
      required: true
    },
    tbCity: {
      required: true
    },
    tbState: {
      required: true
    },
    tbZip: {
      required: true
    },
    tbCountry: {
      required: true
    },
    tbPhone: {
      required: true
    },
    tbEmail: {
      required: true,
      email: true
    },
    tbSeries: {
      required: true
    },
    tbModel: {
      required: true
    },
    ddTimeFrame: {
      required: true
    },
    tbCompanyName: {
      required: true
    },
    tbCompanyWebsite: {
      required: true
    },
    tbYearsinBusiness: {
      required: true
    },
    ddTypeofBusiness: {
      required: true
    },
    ddBusinessFunction: {
      required: true
    },
    ddNumberofLocation: {
      required: true
    }
  },
  messages: {
    tbFName: "Please provide first name",
    tbLName: "Please provide last name",
    tbEmail: {
      required: "Please provide a valid email address",
      email: "name@domain.com format please"
    }
  }
});


$('form#form-request-a-brochure').validate({
  rules: {
    tbFName: {
      required: true
    },
    tbLName: {
      required: true
    },
    tbAddress: {
      required: true
    },
    tbCity: {
      required: true
    },
    tbState: {
      required: true
    },
    tbZip: {
      required: true
    },
    tbCountry: {
      required: true
    },
    tbPhone: {
      required: true
    },
    tbEmail: {
      required: true,
      email: true
    },
    tbSeries: {
      required: true
    },
    tbModel: {
      required: true
    },
    ddTimeFrame: {
      required: true
    },
    day: {
      required: true
    },
    timeOfDay: {
      required: true
    }

  },
  messages: {
    tbFName: "Please provide first name",
    tbLName: "Please provide last name",
    tbEmail: {
      required: "Please provide a valid email address",
      email: "name@domain.com format please"
    }
  }
});




$('form#form-become-a-dealer').validate({
  rules: {
    tbFName: {
      required: true
    },
    tbLName: {
      required: true
    },
    tbAddress: {
      required: true
    },
    tbCity: {
      required: true
    },
    tbState: {
      required: true
    },
    tbZip: {
      required: true
    },
    tbCountry: {
      required: true
    },
    tbPhone: {
      required: true
    },
    tbEmail: {
      required: true,
      email: true
    },
    tbSeries: {
      required: true
    },
    tbModel: {
      required: true
    },
    ddTimeFrame: {
      required: true
    },
    day: {
      required: true
    },
    timeOfDay: {
      required: true
    }

  },
  messages: {
    tbFName: "Please provide first name",
    tbLName: "Please provide last name",
    tbEmail: {
      required: "Please provide a valid email address",
      email: "name@domain.com format please"
    }
  }
});
