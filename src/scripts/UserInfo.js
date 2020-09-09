"use strict";
class UserInfo {
  constructor(nameElmnt, jobElmnt, inputName, inputJob) {
    this.nameElmnt = nameElmnt;
    this.jobElmnt = jobElmnt;
    this.inputName = inputName;
    this.inputJob = inputJob;
    this.name = ' ';
    this.job = ' ';
  }

  setUserInfo = (newName, newJob) => {
    this.name = newName;
    this.job = newJob;
  }

  getUserInfo = () => {
    this.inputName.value = this.name;
    this.inputJob.value = this.job;
  }

  updateUserInfo = () => {
    this.nameElmnt.textContent = this.name;
    this.jobElmnt.textContent = this.job;
  }
}

export { UserInfo };
