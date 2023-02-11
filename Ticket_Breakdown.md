# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Create a new table called FacilityAgent

#### Description:

Facilities would like to add their own custom id for agents working shifts for them, this means that we need a many to many relationship represented in a new table, my suggestion is that we create a `FacilityAgent` Table that includes the foreign keys for the facility and the agent as columns as well as a custom id table for the facility to set

#### Acceptance Criteria:

- The table should include the fields agent_id, facility_id, custom_agent_id
- The custom_agent_id should be unique and not nullable
- agent_id, facility_id and should be foreign keys referencing their respective tables

### Add 2 new api put endpoint to handle setting the custom id

#### Description:

Facilities would need to set/update the custom id they have for their respective agents to be used in generating their reports, the first api endpoint should handle single update, the second should handle bulk

#### Acceptance Criteria:

- The endpoints should check that only the facility admin might make this action
- The endpoints should create a new row in the `FacilityAgent` table if there wasn't already
- The endpoints should return 404 if it could not find the agent referenced by the `agent_id` parameter

### Update the `generateReport` method

#### Description:

Include the custom id of the agent respective to the facility requesting the report

#### Acceptance Criteria:

- The custom_id should be shown properly and the UI of the PDF file should not be affected

### Create a new method that generates a new report for quarterly agent hours

#### Description:

The report should contain the total hours worked by an agent in a facility for a certain quarter

Currently we have a similar flow with the `getShiftsByFacility` and `generateReport` functions we
would like to add a third function `getFacilityQuarterlyHours` which

1. Queries all shifts where

- the shift creation time is after the start of the provided quarter
- and is before the end of the quarter (e.g 1/1/2020 - 31/3/2020)

1. Groups them by agent_id
2. Sums the hours for each agent from each shift
3. Returning a table containing agent's id, facility id, totalQuarterHours
4. Joins agent_id on `Agents` to get the agent's name
5. Joins agent_id and facility_id on `FacilityAgent` to get the facility assigned custom_id
6. returns agent_id, facility_id, agent_custom_id, agent_name
7. reuse the same pdf ui as the old unless you receive a newer ui `generateReport` change its title to Agent hours for Facility Q{quarter_number}
8. Add the list returned from the result in step 7 to the pdf

Preferably separate the data getter function and the pdf function

#### Acceptance criteria:

- Only facility admin is authorized
- make sure to separate query function from pdf function as the UI might change
