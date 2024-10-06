# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the code
COPY . ./
RUN dotnet publish -c Release -o out

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Set environment variables
ENV ASPNETCORE_ENVIRONMENT=Development

# Expose the port that the application will listen on
EXPOSE 8080

# Run the application
ENTRYPOINT ["dotnet", "MyApi.dll"]
