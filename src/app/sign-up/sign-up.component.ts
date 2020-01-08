import { Component, OnInit, ViewChild } from '@angular/core';
import{ BankService } from '../bank.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { formValidations, MustMatch } from '../shared/form-validation';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public hide = true;
// public surname;
// public midname;
// public lastname;
// public email;
// public phone;
// public gender;
// public username;
// public password;
public genderList: string[] = ['male','female'];
public states: string[] = ['Abia','Abuja','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River'
                            ,'Delta','Edo','Ekiti','Imo','Kano','Katsina','Kogi','Kwara','Kebbi','Lagos','Niger','Ogun',
                          'Ondo','Oyo','Osun','Rivers','Taraba','Sokoto','Yobe','Zamfara']
public checkUname;
public checkEmail;
public verifyEmail:boolean = false;
public verifyUsername:boolean = false;
isLinear:boolean = true;
regForm: FormGroup;
secondFormGroup: FormGroup;
public selectedFile: File;
public image;
public passport;
public imageExist;
public imageLarge;
public imageType;
public imageUploaded;



@ViewChild('personal') personalInfo;

  get surName(){
    return this.regForm.get('surname');
  }
  get midName(){
   return this.regForm.get('midname');
  }
  get lastName(){
    return this.regForm.get('lastname');
   }
  get phone(){
    return this.regForm.get('phone');
   }
   get mail(){
    return this.regForm.get('email');
   }
   get gder(){
    return this.regForm.get('gender');
   }
   get userName(){
    return this.regForm.get('username');
   }
   get pass(){
    return this.regForm.get('password');
  }
  get confirmPass(){
    return this.regForm.get('confirm');
  }
  get str(){
    return this.regForm.get('address.street');
  }
  get cities(){
    return this.regForm.get('address.city');
  }
  get stat(){
    return this.regForm.get('address.state');
  }
  get zipee(){
    return this.regForm.get('address.zip');
  }


  constructor(private _bankService: BankService, private router: Router,private fb: FormBuilder) { } 
  // formValidations(/^[\d]{1,10}/)
  ngOnInit() {
    this.regForm = this.fb.group({
      surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('[a-zA-Z]+$')]],
      midname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('[a-zA-Z]+$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      // passport: ['',Validators.required],
      username: ['', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(25)]],
      confirm: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(25)]],
      // account: ['', Validators.required],
      address: this.fb.group({
        street:['',[Validators.required,Validators.minLength(3), Validators.maxLength(25)]],
        city: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(25)]],
        state: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(25)]],
        zip: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(4)]]
      }),
    },{
      validator: MustMatch('password','confirm')
      }
     );


    this.secondFormGroup = this.fb.group({
      
    });

  }

  checkGender(event: any){
   let gend = this.regForm.controls['gender'];
  //  gend = event.target.value;
  console.log(this.regForm.value.gender)
  this.regForm.value.gender = event.target.value;
  if(event.target.value == 'male'){
    this.regForm.patchValue({
      gender:'male'
    })
  }else{
    this.regForm.patchValue({
      gender:'female'
    })
  }
  }

  imgShow(files: File[]){
    if(files.length>0){
      this.selectedFile = files[0];
      console.log(this.selectedFile);
      let reader = new FileReader();
      reader.onload = (event:any)=>{
        this.image = event.target.result;
        // this.regForm.value.passport = this.image;
      }
      reader.readAsDataURL(this.selectedFile);
      this.passport = this.selectedFile.name;
      alert(this.passport);
    //  console.log(this.regForm.controls['surname'].value);
    }
  }
  openInput(){
    console.log(this.regForm.controls);
    const invalid =[];
    const controls = this.regForm.controls;
    for(const name in controls){
      if(controls[name].invalid){
        invalid.push(name);
        console.log(invalid);
      }
    }
  //   console.log(this.regForm.value);
  //   let pass = new FormData();
  //   pass.append('passport',this.selectedFile, this.passport)
    // this.regForm.value.passport = pass;
          // this._bankService.uploadPassport(pass)
          // .subscribe(data=>{
          //   console.log(data);
          //   if(data.success){
          //     alert("Done!");
          //   }
          // })
  }


  onSubmit(){
    // this.openInput();
    
    let checkIfUsed = {
      email : this.regForm.get('email').value
    }
    let checkIfUsernameUsed = {
      username : this.regForm.get('username').value
    }
    console.log(checkIfUsed);
    this._bankService.check(checkIfUsed)
            .subscribe(data=>{
            console.log(data);
            
            if(data.email){
              this.checkEmail = data.emailMessage;
            }
            if(!data.email){
              this.checkEmail = data.emailMessage;
              this.verifyEmail = true;
            }
          });
    this._bankService.checkUsername(checkIfUsernameUsed)
        .subscribe(data => {
          console.log(data);
          if(data.username){
              this.checkUname = data.unameMessage;
            }
            if(!data.username){
              this.checkUname = data.unameMessage;
              this.verifyUsername = true;
            }
        });     
        // this.verify = true;
          if(this.verifyUsername && this.verifyEmail){
            let pass = new FormData();
                pass.append('passport',this.selectedFile);
                pass.append('surname',this.regForm.get('surname').value);
                pass.append('midname',this.regForm.get('midname').value);
                pass.append('lastname',this.regForm.get('lastname').value);
                pass.append('phone',this.regForm.get('phone').value);
                pass.append('email',this.regForm.get('email').value);
                pass.append('gender',this.regForm.get('gender').value);
                pass.append('username',this.regForm.get('username').value);
                pass.append('password',this.regForm.get('password').value);
                // pass.append('account',this.regForm.get('account').value);
                pass.append('street',this.regForm.get('address.street').value);
                pass.append('city',this.regForm.get('address.city').value);
                pass.append('state',this.regForm.get('address.state').value);
                pass.append('zip',this.regForm.get('address.zip').value);

                // this._bankService.signup(this.regForm.value)
                this._bankService.signup(pass)
                .subscribe(data => {
                  console.log(data);
                  if(data.imageExist){
                    this.imageExist = data.imageExist;
                  }
                  if(data.imageLarge){
                    this.imageLarge = data.imageLarge;
                  }
                  if(data.imageType){
                    this.imageType = data.imageType;
                  }
                  if(data.uploaded){
                    this.imageUploaded = data.imageExist;
                  }
                  if(data.success){
                    this.router.navigate(['accountRegistration']);
                  }else{
                    alert('Please go back and correct the invalid inputs');
                  }
                })
              };
    }


  signUpHandler(){
    //formdata api
// let userInfo = {
//     surname: this.surname,
//     midname: this.midname,
//     lastname: this.lastname,
//     email: this.email,
//     phone: this.phone,
//     gender: this.gender,
//     username: this.username,
//     password: this.password,
// }  
//     this._bankService.check({
//       username : this.username,
//       email : this.email
//     }).subscribe(data=>{
//       console.log(data);
//       if(data.username){
//         this.checkUname = data.unameMessage;
//       }
//       if(!data.username){
//         this.checkUname = data.unameMessage;
//       }
//       if(data.email){
//         this.checkEmail = data.emailMessage;
//       }
//       if(!data.email){
//         this.checkEmail = data.emailMessage;
//       }
//       if(!data.username && !data.email){
//         this.verify = true;
//       }
//     });

//     if(this.verify){
//     this._bankService.signup(userInfo)
//     .subscribe(data=>{
//       console.log(data);
//       if(data.success){
//         this.router.navigate(['login']);
//       }else{
//         alert();
//       }
//     })
//   };
   }
}
