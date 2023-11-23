# DDaT Template Generator
A standardised way to create job specs and interview templates from the [Digital, Data and Technology Profession Capability Framework]((https://www.gov.uk/government/collections/digital-data-and-technology-profession-capability-framework)).

The DDaT framework is incredible, but it's not always easy to score candidates against the criteria in a consistent way. This tool aims to make it easier to create job specs and interview templates that are consistent and easy to use.

## Generating the skills data
Included in this repository is a Python script that scrapes the [DDaT website](https://www.gov.uk/government/collections/digital-data-and-technology-profession-capability-framework) and generates a JSON file containing the relevant information. 

An already generated JSON file is included in this repository, but if you want to generate your own, you can run the following command:

```bash
python3 /scrape/getSkills.py
```

## Running the template generator
The template generator is a [Next.js](https://nextjs.org/) app. To run it, you'll need to have [Node.js](https://nodejs.org/en/) installed. Once you have Node.js installed, you can run the following commands:

```bash
cd /template-generator
npm install
npm run dev
```

This will start a local server on port 3000. You can access the template generator by visiting [http://localhost:3000](http://localhost:3000).






