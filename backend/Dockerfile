FROM maven:3.8.4-jdk-8 AS build
COPY src /app/src
COPY pom.xml /app
WORKDIR /app
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-alpine
COPY --from=build /app/target/fitpersonal_backend.jar /app/app.jar
WORKDIR /app
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
