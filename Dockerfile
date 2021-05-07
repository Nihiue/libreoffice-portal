FROM ubuntu:18.04

# tuna mirror
# COPY sources.list /etc/apt/sources.list

# install libreoffice
RUN apt-get update
RUN apt-get -y -q install gdb libreoffice libreoffice-writer ure libreoffice-java-common libreoffice-core libreoffice-common openjdk-8-jre fonts-opensymbol hyphen-fr hyphen-de hyphen-en-us hyphen-it hyphen-ru fonts-dejavu fonts-dejavu-core fonts-dejavu-extra fonts-droid-fallback fonts-dustin fonts-f500 fonts-fanwood fonts-freefont-ttf fonts-liberation fonts-lmodern fonts-lyx fonts-sil-gentium fonts-texgyre fonts-tlwg-purisa
RUN apt-get -y -q remove libreoffice-gnome

# install node.js
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs


WORKDIR /root/workspace/libre-portal
COPY . .
RUN npm install

ENTRYPOINT ["node",  "./src/index.js"]

EXPOSE 3000
