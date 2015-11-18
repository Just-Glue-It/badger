<TeXmacs|1.99.2>

<style|generic>

<\body>
  <doc-data|<doc-title|Object Oriented Design>|<doc-author|<author-data|<author-name|>>>>

  <section|System Design>

  <subsection|Server System Design>

  \;

  <subsubsection|Server>

  Our server is hosted on Digital Ocean and runs Ubuntu 15.10.

  <subsubsection|Docker>

  We are using Docker and Docker Compose to manage the creation and linking
  of our subsystems. Docker Compose lets us declaratively configure our
  server, this is great for having reproducable builds, and development
  environments.

  <subsubsection|Nginx>

  We are using Nginx as a reverse proxy, that is, Nginx listens for incoming
  requests and redirects them to the localhost of the Postgrest container. We
  do this because it will allow us to scale the number of postgrest
  containers to handle more load. Also, Nginx is better at serving static
  content, then our postgrest server.

  <subsubsection|Postgrest>

  Postgrest is a wrapper around the PostgreSQL database. It exposes the
  database via a RESTful API and handles some of the authentication for us.
  We decided to use Postgrest because it would save us a lot of work in
  writing a backend. Postgrest is still in Beta so this decision may come
  back to bite us.

  <subsubsection|PostgreSQL>

  We wanted a relational database to catch our mistakes when we try to put
  bad data into the database. Of the many relational databases, we chose to
  go with PostgreSQL because it is one of the most advanced open source
  databases around. Also we found Postgrest which we were excited to try out.

  <subsection|Frontend>

  <subsubsection|Cordova>

  In order to maximize developer productivity, we are using the Cordova
  platform to allow us to write our app using web technologies.

  <subsubsection|Cycle.js>

  We wanted to be able to describe our app as declaratively as possible
  because we feel that programs written in this style will have fewer bugs
  and performs better.

  <subsubsection|Views>

  The Views subsystem will be a collection of visual components for our app,
  these views get their data from the RxJS observables and they update
  whenever a new value comes down the observable pipe.

  <subsubsection|RxJS>

  Cycle.js uses RxJS as the `C' part of MVC. The main difference is that in
  most cases it's a push only mode of data transfer, ie. the views don't have
  to ask for new data, the new data will be pushed to them.

  <subsubsection|Drivers>

  In Cycle.js, the Drivers are the `M' in MVC. They manage all the stateful
  parts of our app, eg. API requests, storing data to phone, etc.

  By constraining ourselves to isolating all state mutation to this
  subsystem, we free ourselves in our other subsystems to have very
  deterministic programs.

  \;
</body>

<initial|<\collection>
</collection>>

<\references>
  <\collection>
    <associate|auto-1|<tuple|1|?>>
    <associate|auto-10|<tuple|1.2.2|?>>
    <associate|auto-11|<tuple|1.2.3|?>>
    <associate|auto-12|<tuple|1.2.4|?>>
    <associate|auto-13|<tuple|1.2.5|?>>
    <associate|auto-14|<tuple|1.3.5|?>>
    <associate|auto-2|<tuple|1.1|?>>
    <associate|auto-3|<tuple|1.1.1|?>>
    <associate|auto-4|<tuple|1.1.2|?>>
    <associate|auto-5|<tuple|1.1.3|?>>
    <associate|auto-6|<tuple|1.1.4|?>>
    <associate|auto-7|<tuple|1.1.5|?>>
    <associate|auto-8|<tuple|1.2|?>>
    <associate|auto-9|<tuple|1.2.1|?>>
  </collection>
</references>