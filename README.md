RatticWeb
=========

RatticWeb is the website part of the Rattic password management solution, which allows you to easily manage your users and passwords.

Description: Rattic fork with ecryption.

## Encrypted with client side AES shared key

### Why? Why is so important to encrypt?
#### Short answer: 
Because **only** the accounts with *view* access should be able to view a password.
#### Long answer:
Users can fall into 3 main access groups: *No rights*, *Access rights* and *View rights*. *Access rights* is granted via the groups or LDAP group membership. To *view* the password the user also needs the encrypt key. This way even if you are a member of a group you need the *key* to 
decrypt. This also adds the function of *private* passwords - with a key only you know. 
Encrypted passwotds prevent someone to dump the database and view all the passwords, including 3rd party and sysadmins... yes sysadmins should not be able to *view* a password just because they administer the system.
The *Password Management Solution* must provide storage, history, search, access etc. etc. while the real 
password strings **must** be accessible **only** from the users.
#### Why AES?
Because it's a standard, simple, easy to implement, easy to understand.
#### Which AES implementation?
http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/aes.js

ToDo: test WebCrypto. https://github.com/diafygi/webcrypto-examples/#aes-cbc
#### So, what about the API? Can I still use my command line ninja scripts?
To fetch the password and decrypt yourself:
```
curl -sk -H "Authorization: ApiKey USERNAME:API_KEY" -H "Accept: application/json" https://rattic-url.com/api/v1/cred/1/| jq '.password'
"U2FsdGVkX19rYQZwwyDs1ICWX7RRUAsKYPbJ8YDFoS0="
```
or
```
curl -sk -H "Authorization: ApiKey USERNAME:API_KEY" -H "Accept: application/json" https://rattic-url.com/api/v1/cred/1/ \
| jq '.password' | xargs echo -n | base64 -d \
| openssl enc -d -aes-256-cbc -pass pass:"KEY_USED_TO_ENCRYPT"
```

#### Take the following into account:
* The webpage should be served over HTTPS only, apart from a redirect from normal HTTP.
* The filesystem in which the database is stored ~~should~~ can be protected with encryption.
* The access logs should be protected.
* The machine which serves RatticWeb should be protected from access.
* Tools like <a href=="http://www.ossec.net/">OSSEC</a>,modsecure and  <a href=="https://github.com/nbs-system/naxsi>naxsi</a> are your friend.

Support and Known Issues:
* Through <a href="http://twitter.com/RatticDB">twitter</a> or <a href="https://github.com/tildaslash/RatticWeb/issues?state=open">Github Issues</a> or <a href="https://github.com/danislav/RatticWeb/issues?state=open">Github Issues in this fork</a>
* Apache config needs to have "WSGIPassAuthorization On" for the API keys to work

Dev Setup: <https://github.com/tildaslash/RatticWeb/wiki/Development>

