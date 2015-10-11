function savekey(e) {
        localStorage.setItem("aeskey", document.getElementById("encryptkey").value);
        alert('You just set the AES encryption passphrase.\nBe aware that this will encrypt/decrypt all passwords\nHappy Passwording!');
	document.getElementById("encryptkey").value = "scrambled hahaha"
	return false;
}

document.getElementById("encryptkey").value = localStorage.getItem("aeskey");

function encryptpass(e) {
	var clearvalue = document.getElementById("id_password").value;
	// We can use the salt from the cfg file so if the encryption is enabled but the user does not put a key - the passwords will still be encrypted
	// Commandline usage would be more complicated as the salt have to be added
	// openssl enc -d -aes-256-cbc -pass pass:"THE_PASSWORD+salt" -base64
	//var thekey = localStorage.getItem("aeskey") + "-" + document.getElementById('salt').value;
	// To encrypt command line instead here: echo "PASSWORD_CLEARTEXT"|openssl enc -aes-256-cbc -pass pass:"ENCRYPT_KEY" -e -base64
	var thekey = localStorage.getItem("aeskey");
	var encrypted = CryptoJS.AES.encrypt(clearvalue, thekey);
	// To be able to directly put encrypted password we will limit the password length to 40 symbols
	if (document.getElementById("id_password").value.length < 41) {
		document.getElementById("id_password").value = encrypted;
	}
	// to decrypt with command line: openssl enc -d -aes-256-cbc -pass pass:"THE_PASSWORD" -base64
	return true;
}


var formenc = document.getElementById('encform');
if (formenc.attachEvent) {
    formenc.attachEvent("submit", savekey);
} else {
    formenc.addEventListener("submit", savekey);
}

var formeditcred = document.getElementById('crededit');
if (formeditcred.attachEvent) {
    formeditcred.attachEvent("submit", encryptpass);
} else {
    formeditcred.addEventListener("submit", encryptpass);
}
