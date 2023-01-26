# SpoofCheckMail

## Disclaimer

Educationnal purpose only

## Infos

 * Soft: just all mechanism
 * Advanced: build the list and check for every IP

## Features


## Planned Features

API Ready
Check for order evaluation
Check for something after all mechanism
Check for something after redirect mechanism
Check for multiple v=spf1 on record -> qualification des unexpected tokens

## Install

``` sh
npm i

```

## Usage

``` sh
node index.js check -d example.com

```

## Return Value

``` json
{
    'domain': ,
    'dnsStatus': ,
    'spfRecord': ,
    'mechanisms': ,
    'modifiers': ,

    'allMechanism': ,
    'ip4Mechanism': ,
    'ip6Mechanism': ,
    '': ,

    'spfStatus': ,
}
```

## Guidelines

Please do not contribute at this time. You can therefore open issue