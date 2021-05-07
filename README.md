# LibreOffice Portal

Format convert service based on LibreOffice on Linux.

## Deploy

```
$ sudo docker pull nihiue/libreoffice-portal
$ sudo docker run -d -p 3000:3000 --restart=always --name libreoffice-portal
```

## Usage

### browser

Open http://localhost:3000/ in browser

### API

POST http://localhost:3000/office2pdf

BODY:
```
const formData = new FormData();
formData.append('file', fileInputElement.files[0]);
```
  
