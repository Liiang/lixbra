
class Protocol {
    constructor() {
        this.clients = new Map();
    }
    $BeforeSend() { }
    $AfterRecv() { }
    close(){}

}