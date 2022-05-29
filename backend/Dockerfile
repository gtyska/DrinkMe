FROM --platform=linux/amd64 maven:3.8.5-openjdk-17 as build
# speed up maven jvm to be compiled at the optimized level
ENV MAVEN_OPTS="-XX:+TieredCompilation -XX:TieredStopAtLevel=1"
# set working directory
WORKDIR /opt/drinkme
# copy just pom.xml
COPY pom.xml .
# go-offline using the pom.xml
RUN mvn dependency:go-offline
# copy your other files
COPY ./src ./src
# compile the source code and package it in a jar file
RUN mvn clean install -Dmaven.test.skip=true

# copy the built artifact
FROM --platform=linux/amd64 openjdk:17-alpine
WORKDIR /home/root/app
COPY --from=build /opt/drinkme/target/drinkme-0.0.1-SNAPSHOT.jar /home/root/app
ENTRYPOINT ["java","-jar","drinkme-0.0.1-SNAPSHOT.jar"]