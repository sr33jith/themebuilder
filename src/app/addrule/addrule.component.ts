import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { NewFlowService } from './../../newflow.service';

@Component({
  selector: 'app-naddrule',
  templateUrl: './addrule.component.html',
  styleUrls: ['./addrule.component.css']
})
export class NAddruleComponent implements OnInit {

  public addingRule;
  public ruleAddForm;
  public responseData = 'Processing your request please wait';
  public groupName = '';
  public ruleValidated = true;
  public ruleValidationMsg = 'Rule validation failed';
  public valueTypeChanged;
  public modelList = [];
  public modelPropertyList = [];
  public propertyDataType = [[[]]];
  public propertyList = [ [[]], [[]], [[]], [[]] ];
  public compareList = [
    {value: '==', label: '=='},
    {value: '!=', label: '!='},
    {value: '>', label: '>'},
    {value: '<', label: '<'},
    {value: '>=', label: '>='},
    {value: '<=', label: '<='}
  ];
  public counter = 0;
  constructor(private formBuilder: FormBuilder, private newflowService: NewFlowService) {}

  ngOnInit() {
    this.propertyList[0][0][0] = [];
    this.propertyList[1][0][0] = [];
    this.propertyList[2][0][0] = [];
    this.propertyList[3][0][0] = [];
    this.propertyDataType[0][0][0] = '';

    this.newflowService.getModels().subscribe((resp: any) => {
        for (const model of resp.modelList) {
          const modelOpt = {
            'value': model,
            'label': model
          };
          this.modelList.push(modelOpt);
        }
        for (const index in resp.fieldsMap) {
          if (resp.fieldsMap.hasOwnProperty(index)) {
            const modelFields = {
              [index]: []
            };
            for (const field of resp.fieldsMap[index]) {
              const fieldData = {
                label: field.fieldName,
                value: field.fieldName,
                fieldType: field.fieldType
              };
              modelFields[index].push(fieldData);
            }
            this.modelPropertyList.push(modelFields);
          }
        }
      }, (error: any) => { console.log('error : ' + error);  });
      console.log(this.modelPropertyList);
    this.ruleAddForm = this.formBuilder.group({
      'groupName': new FormControl(this.groupName, {
        validators: Validators.required,
        updateOn: 'change'
      }),
      itemRows: this.formBuilder.array([this.initItemRows()]) // here
    });
  }

  initItemRows() {
    return this.formBuilder.group({
      // list all your form controls here, which belongs to your form array
      'ruleName': new FormControl(null, {
        validators: Validators.required,
        updateOn: 'blur'
      }),
      'ruleNameDesc': new FormControl('', {
        updateOn: 'blur'
      }),
      // list all your form controls here, which belongs to your form array
      itemWhenRows: this.formBuilder.array([this.initItemWhenRows()]),
      itemThenRows: this.formBuilder.array([this.initItemThenRows()])
    }, { updateOn: 'submit' });
  }

  initItemWhenRows() {
    return this.formBuilder.group({
      'whenOpen': new FormControl('none', {
        updateOn: 'blur'
      }),
      'whenModel': new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur'
      }),
      'whenProperty': new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur'
      }),
      'whenComp': new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur'
      }),
      'whenValType': new FormControl('value', {
        updateOn: 'change'
      }),
      'whenVal': new FormControl(null, {
        updateOn: 'blur'
      }),
      'whenModelType': new FormControl('', {
        updateOn: 'blur'
      }),
      'whenPropertyType': new FormControl('', {
        updateOn: 'blur'
      }),
      'whenClose': new FormControl('none', {
        updateOn: 'blur'
      }),
      'whenJoiner': new FormControl('AND')
    });
  }

  initItemThenRows() {
    return this.formBuilder.group({
      'thenModel': new FormControl('', {
        updateOn: 'blur'
      }),
      'thenProperty': new FormControl('', {
        updateOn: 'blur'
      }),
      'thenValType': new FormControl('value', {
        updateOn: 'change'
      }),
      'thenVal': new FormControl(null, {
        updateOn: 'blur'
      }),
      'thenModelType': new FormControl('', {
        updateOn: 'blur'
      }),
      'thenPropertyType': new FormControl('', {
        updateOn: 'blur'
      }),
      'thenJoiner': new FormControl('AND')
    });
  }

  addRule() {
    console.log('here');
    if (this.ruleAddForm.dirty && this.ruleAddForm.valid) {
      this.addingRule = true;
      const ruleData = JSON.stringify(this.ruleAddForm.controls.itemRows.value);
      const ruleAddData = this.newflowService.parseFormData(ruleData, this.ruleAddForm.controls.groupName.value);
      console.log(JSON.stringify(ruleAddData));
      this.newflowService.addRule(JSON.stringify(ruleAddData)).subscribe((resp: any) => {
        console.log(resp);
        this.responseData = resp._body;
      }, (error: any) => { console.log('error : ' + error);  });
    } else {
      this.addingRule = false;
    }
  }

  loadProperties(event, pos, row, col) {
    const modelSelected = event.target.value;
    for (const model of this.modelPropertyList) {
      if (model.hasOwnProperty(modelSelected)) {
        this.propertyList[pos][row][col] = model[modelSelected];
      }
    }
  }

  checkPropertyType(event, pos, row, col) {
    const propertySelected = event.target.value;
    this.propertyDataType[pos][row][col] = 'String';
    for (const property of this.propertyList[pos][row][col]) {
      if (property.label === propertySelected) {
        this.propertyDataType[pos][row][col] = property.fieldType;
      }
    }

  }

  validateRule(test) {
    console.log('call validation service using the template');
  }

  addMore() {
    this.ruleValidated = true;
    // Validate rule before proceeding
    const ruleToValidate = this.ruleAddForm.controls.itemRows.value[this.counter];

    const singleRuleAddData = this.newflowService.parseFormData(JSON.stringify([ruleToValidate]),
    this.ruleAddForm.controls.groupName.value);
    if (singleRuleAddData === 'failed') {
      this.ruleValidated = false;
      this.ruleValidationMsg = 'Rule validation failed';
    }

    this.newflowService.validateRule(JSON.stringify(singleRuleAddData)).subscribe((resp: any) => {
      console.log(resp);
      if (resp._body === 'Validation Successful') {
        this.ruleValidated = true;
        this.counter++;
        // control refers to your formarray
        const control = <FormArray>this.ruleAddForm.controls['itemRows'];
        this.propertyList[0][this.counter] =  [[]];
        this.propertyList[1][this.counter] =  [[]];
        this.propertyList[2][this.counter] =  [[]];
        this.propertyList[3][this.counter] =  [[]];
        this.propertyDataType[0][this.counter] = [];
        this.propertyDataType[0][this.counter][0] = '';
        // add new formgroup
        control.push(this.initItemRows());
      } else {
        this.ruleValidated = false;
        this.ruleValidationMsg = resp._body;
      }
     }, (error: any) => { console.log('error : ' + error._body);  });
  }

  removeRule(index: number) {
    // control refers to your formarray
    const control = <FormArray>this.ruleAddForm.controls['itemRows'];
    // add new formgroup
    control.removeAt(index);
  }

  addMoreWhen(event) {
    // control refers to your formarray
    const control = <FormArray>this.ruleAddForm.controls['itemRows'].controls[event].controls['itemWhenRows'];
    console.log(control);
    // add new formgroup
    control.push(this.initItemWhenRows());
  }

  removeRuleWhen(itemId, index: number) {
    // control refers to your formarray
    const control = <FormArray>this.ruleAddForm.controls['itemRows'].controls[itemId].controls['itemWhenRows'];
    // add new formgroup
    control.removeAt(index);
  }

  addMoreThen(event) {
    // control refers to your formarray
    const control = <FormArray>this.ruleAddForm.controls['itemRows'].controls[event].controls['itemThenRows'];
    // add new formgroup
    control.push(this.initItemThenRows());
  }

  removeRuleThen(itemId, index: number) {
    // control refers to your formarray
    const control = <FormArray>this.ruleAddForm.controls['itemRows'].controls[itemId].controls['itemThenRows'];
    // add new formgroup
    control.removeAt(index);
  }
}
