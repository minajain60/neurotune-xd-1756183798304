sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/m/MessagePopover",
  "sap/m/MessageItem",
  "sap/ui/core/library",
  "sap/ui/core/UIComponent",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/core/util/Export",
  "sap/ui/core/util/ExportTypeCSV"
], function (Controller, JSONModel, MessageToast, MessageBox, MessagePopover, MessageItem, coreLibrary, UIComponent, Filter, FilterOperator, Export, ExportTypeCSV) {
  "use strict";

  // Shortcut for sap.ui.core.MessageType
  var MessageType = coreLibrary.MessageType;

  /**
   * @name converted.transactionsoverviewview.controller.TransactionsOverviewView
   * @class Controller for the TransactionsOverviewView.view.xml view.
   * @extends sap.ui.core.mvc.Controller
   */
  return Controller.extend("converted.transactionsoverviewview.controller.TransactionsOverviewView", {

    /**
     * Called when the view is initialized.
     * @public
     */
    onInit: function () {
      // Log initialization message
      console.log("TransactionsOverviewView controller initialized");

      // Load mock data for application areas
      var oApplicationAreaModel = new JSONModel();
      oApplicationAreaModel.loadData("model/mockData/applicationAreas.json");
      this.getView().setModel(oApplicationAreaModel, "applicationAreas");

      // Load mock data for data languages
      var oDataLanguageModel = new JSONModel();
      oDataLanguageModel.loadData("model/mockData/dataLanguages.json");
      this.getView().setModel(oDataLanguageModel, "dataLanguages");

      // Load mock data for master data
      var oMasterDataModel = new JSONModel();
      oMasterDataModel.loadData("model/mockData/masterData.json");
      this.getView().setModel(oMasterDataModel, "masterData");

      // Load mock data for transactional data
      var oTransactionalDataModel = new JSONModel();
      oTransactionalDataModel.loadData("model/mockData/transactionalData.json");
      this.getView().setModel(oTransactionalDataModel, "transactionalData");

      // Load mock data for customizing tables
      var oCustomizingTablesModel = new JSONModel();
      oCustomizingTablesModel.loadData("model/mockData/customizingTables.json");
      this.getView().setModel(oCustomizingTablesModel, "customizingTables");

      // Set default values for dropdowns
      var oViewModel = new JSONModel({
        selectedAppAreaKey: "ALL",
        selectedDataLanguageKey: "EN",
        searchQuery: "",
        elsaExtractExpanded: false,
        exploreExpanded: false
      });
      this.getView().setModel(oViewModel, "view");

      // Initialize message model for MessageArea/MessagePopover
      var oMessageModel = new JSONModel({
        messages: [{
          type: MessageType.Success,
          title: "System Information",
          description: "Application converted successfully. Use AI optimize for better result",
          subtitle: "Conversion complete",
          counter: 1
        }]
      });
      this.getView().setModel(oMessageModel, "messages");
    },

    /**
     * Called before the view is rendered.
     * @public
     */
    onBeforeRendering: function () {
      // Log message
      console.log("TransactionsOverviewView view will be rendered");
    },

    /**
     * Called after the view has been rendered.
     * @public
     */
    onAfterRendering: function () {
      // Log message
      console.log("TransactionsOverviewView view rendered");
    },

    /**
     * Handle the selection change event for the application area dropdown.
     * @param {sap.ui.base.Event} oEvent The selection change event.
     * @public
     */
    onAppAreaChange: function (oEvent) {
      // Get the selected key
      var sSelectedAppArea = oEvent.getSource().getSelectedKey();
      // Log the selected application area
      console.log("Application Area changed to: " + sSelectedAppArea);
      // Show a message toast
      MessageToast.show("Application Area changed to: " + sSelectedAppArea);
      // Apply filtering logic here based on sSelectedAppArea
    },

    /**
     * Handle the search event.
     * @param {sap.ui.base.Event} oEvent The search event.
     * @public
     */
    onSearch: function (oEvent) {
      // Get the search query
      var sQuery = oEvent.getParameter("query");
      // Log the search query
      console.log("Search performed for: '" + sQuery + "'");
      // Show a message toast
      MessageToast.show("Search performed for: '" + sQuery + "'");

      // Create filters for the search
      var aFilters = [];
      if (sQuery && sQuery.length > 0) {
        // Apply filters to the lists based on the search query
        aFilters.push(new Filter({
          filters: [
            new Filter("name", FilterOperator.Contains, sQuery),
            new Filter("description", FilterOperator.Contains, sQuery)
          ],
          and: false
        }));
      }
    },

    /**
     * Handle the selection change event for the data language dropdown.
     * @param {sap.ui.base.Event} oEvent The selection change event.
     * @public
     */
    onDataLanguageChange: function (oEvent) {
      // Get the selected key
      var sSelectedDataLang = oEvent.getSource().getSelectedKey();
      // Log the selected data language
      console.log("Data Language changed to: " + sSelectedDataLang);
      // Show a message toast
      MessageToast.show("Data Language changed to: " + sSelectedDataLang);
      // Apply data language logic here based on sSelectedDataLang
    },

    /**
     * Handle navigation link press events
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onNavigationLinkPress: function (oEvent) {
      var oSource = oEvent.getSource();
      var sHref = oSource.getHref();

      if (sHref) {
        // If href is set, let the default behavior handle it
        return;
      }

      // Otherwise, handle the navigation programmatically
      var sNavTarget = oSource.data("navTarget");
      if (sNavTarget) {
        MessageToast.show("Navigating to: " + sNavTarget);
        // In a real application, this would navigate to the appropriate view or application
        // using the router
      }
    },

    /**
     * Handle the press event for the ELSA Extract link.
     * @public
     */
    onToggleELSAExtract: function () {
      // Get the current visibility state of the ELSA Extract sub-menu
      var bCurrentVisibility = this.getView().getModel("view").getProperty("/elsaExtractExpanded");

      // Toggle the visibility state
      this.getView().getModel("view").setProperty("/elsaExtractExpanded", !bCurrentVisibility);

      // Log the action
      console.log("ELSA Extract sub-menu toggled: " + (!bCurrentVisibility));
    },

    /**
     * Handle the press event for the Explore link.
     * @public
     */
    onToggleExplore: function () {
      // Get the current visibility state of the Explore sub-menu
      var bCurrentVisibility = this.getView().getModel("view").getProperty("/exploreExpanded");

      // Toggle the visibility state
      this.getView().getModel("view").setProperty("/exploreExpanded", !bCurrentVisibility);

      // Log the action
      console.log("Explore sub-menu toggled: " + (!bCurrentVisibility));
    },

    /**
     * Export the table data to a CSV file.
     * @public
     */
    onExportToCSV: function () {
      // Get the table ID
      var sTableId = "transactionTable"; // Ensure this matches your table's ID
      // Get the table instance
      var oTable = this.getView().byId(sTableId);

      // Verify if the table exists
      if (!oTable) {
        console.error("Table with ID '" + sTableId + "' not found.");
        return;
      }

      // Get the data from the model
      var aData = oTable.getModel("transactionalData").getData().transactionalData; // Adjust model name and path
      if (!aData) {
        console.error("No data found in the model.");
        return;
      }

      // Convert the data to CSV format
      var sCsvContent = this._convertToCSV(aData);

      // Create a Blob object from the CSV content
      var oBlob = new Blob([sCsvContent], {
        type: 'text/csv'
      });

      // Create a URL for the Blob object
      var sUrl = URL.createObjectURL(oBlob);

      // Create a temporary link element to trigger the download
      var oLink = document.createElement('a');
      oLink.href = sUrl;
      oLink.download = 'transactions_export.csv'; // Set the file name
      oLink.click();

      // Revoke the URL to free up resources
      URL.revokeObjectURL(sUrl);
    },

    /**
     * Convert the given data to CSV format.
     * @param {Array} aData The data to convert.
     * @private
     * @returns {string} The CSV representation of the data.
     */
    _convertToCSV: function (aData) {
      // Check if the data is valid
      if (!aData || aData.length === 0) {
        return '';
      }

      // Extract the headers from the first object in the data array
      var aHeaders = Object.keys(aData[0]);

      // Join the headers with commas and add a newline character
      var sCsv = aHeaders.join(',') + '\n';

      // Iterate over each row of data
      aData.forEach(function (row) {
        // Map each value in the row to a string, enclose it in double quotes, and replace any existing double quotes with two double quotes
        var aValues = aHeaders.map(function (header) {
          return '"' + (row[header] || '').toString().replace(/"/g, '""') + '"';
        });

        // Join the values with commas and add a newline character
        sCsv += aValues.join(',') + '\n';
      });

      // Return the complete CSV string
      return sCsv;
    },

    /**
     * Export the table data to an Excel file.
     * @public
     */
    onExportToExcel: function () {
      var oTable = this.getView().byId("transactionTable"); // Replace with your table ID

      // Check if the table exists
      if (!oTable) {
        console.error("Table with ID 'transactionTable' not found.");
        return;
      }

      // Create an Export object
      var oExport = new Export({
        exportType: new ExportTypeCSV({
          fileExtension: 'xlsx',
          mimeType: 'application/vnd.ms-excel'
        }),
        models: oTable.getModel("transactionalData"), // Use the model containing the data
        rows: {
          path: "/transactionalData" // Path to the data array in the model
        },
        columns: this._getExportColumns() // Get the columns for export
      });

      // Save the file
      oExport.saveFile("transactions_export").then(function () {
        MessageToast.show("Export completed successfully");
      });
    },

    /**
     * Get the columns for the export.
     * @private
     * @returns {Array} An array of column definitions for the export.
     */
    _getExportColumns: function () {
      return [{
        name: "Name", // Column name
        template: {
          content: "{name}" // Data binding for the column
        }
      }, {
        name: "Description",
        template: {
          content: "{description}"
        }
      }];
    },

        /**
         * Handles press event on "Home" link to navigate to the main page.
         */
        onNavHome: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("main");
        },

        /**
         * Handles press event on "Manage Data" link to navigate to the manage data page.
         */
        onManageData: function () {
            // Placeholder for Manage Data navigation logic
            MessageToast.show("Navigating to Manage Data");
        },

        /**
         * Handles press event on "Extract Jobs" link to navigate to the extract jobs page.
         */
        onExtractJobs: function () {
            // Placeholder for Extract Jobs navigation logic
            MessageToast.show("Navigating to Extract Jobs");
        },

        /**
         * Handles press event on "Synchronization" link to navigate to the synchronization page.
         */
        onSynchronization: function () {
            // Placeholder for Synchronization navigation logic
            MessageToast.show("Navigating to Synchronization");
        },

        /**
         * Handles press event on "Reports" link to navigate to the reports page.
         */
        onReports: function () {
            // Placeholder for Reports navigation logic
            MessageToast.show("Navigating to Reports");
        },

        /**
         * Handles press event on "Transactions" link to navigate to the transactions page.
         */
        onTransactions: function () {
            // Placeholder for Transactions navigation logic
            MessageToast.show("Navigating to Transactions");
        },

        /**
         * Handles press event on "Data" link to navigate to the data page.
         */
        onData: function () {
            // Placeholder for Data navigation logic
            MessageToast.show("Navigating to Data");
        },

        /**
         * Handles press event on "Dynamic Report" link to navigate to the dynamic report page.
         */
        onDynamicReport: function () {
            // Placeholder for Dynamic Report navigation logic
            MessageToast.show("Navigating to Dynamic Report");
        },

        /**
         * Handles press event on "Text To SQL-AI Report" link to navigate to the text to SQL-AI report page.
         */
        onTextToSQLAIReport: function () {
            // Placeholder for Text To SQL-AI Report navigation logic
            MessageToast.show("Navigating to Text To SQL-AI Report");
        },

        /**
         * Handles press event on "SQL Report" link to navigate to the SQL report page.
         */
        onSQLReport: function () {
            // Placeholder for SQL Report navigation logic
            MessageToast.show("Navigating to SQL Report");
        },

        /**
         * Handles press event on "Accounting Report" link to navigate to the accounting report page.
         */
        onAccountingReport: function () {
            // Placeholder for Accounting Report navigation logic
            MessageToast.show("Navigating to Accounting Report");
        },

        /**
         * Handles press event on "Settings" link to navigate to the settings page.
         */
        onSettings: function () {
            // Placeholder for Settings navigation logic
            MessageToast.show("Navigating to Settings");
        },

        /**
         * Handles press event on "Data Masking" link to navigate to the data masking page.
         */
        onDataMasking: function () {
            // Placeholder for Data Masking navigation logic
            MessageToast.show("Navigating to Data Masking");
        },

        /**
         * Handles press event on "Manage Security" link to navigate to the manage security page.
         */
        onManageSecurity: function () {
            // Placeholder for Manage Security navigation logic
            MessageToast.show("Navigating to Manage Security");
        },

        /**
         * Handles press event on "Manage Authorizations" link to navigate to the manage authorizations page.
         */
        onManageAuthorizations: function () {
            // Placeholder for Manage Authorizations navigation logic
            MessageToast.show("Navigating to Manage Authorizations");
        },

        /**
         * Handles press event on "Smart Links" link to navigate to the smart links page.
         */
        onSmartLinks: function () {
            // Placeholder for Smart Links navigation logic
            MessageToast.show("Navigating to Smart Links");
        },

        /**
         * Handles press event on "Logs" link to navigate to the logs page.
         */
        onLogs: function () {
            // Placeholder for Logs navigation logic
            MessageToast.show("Navigating to Logs");
        },

        /**
         * Handles the Share action, typically opens a sharing dialog.
         */
        onShare: function () {
            MessageToast.show("Share functionality triggered.");
        },

        /**
         * Handles displaying notifications or opening a notification center.
         */
        onShowNotifications: function () {
            MessageToast.show("Show Notifications triggered.");
        },

        /**
         * Handles voice input functionality, possibly activating a microphone.
         */
        onVoiceInput: function () {
            MessageToast.show("Voice Input triggered.");
        },

        /**
         * Handles language selection change from the global dropdown.
         */
        onLanguageChange: function () {
            MessageToast.show("Global Language changed.");
        },

        /**
         * Handles opening the user menu for profile, logout, etc.
         */
        onUserMenu: function () {
            MessageToast.show("User Menu triggered.");
        },

        /**
         * Handles the Create New action, opening a creation dialog or page.
         */
        onCreateNew: function () {
            MessageToast.show("Create New functionality triggered.");
        },

        /**
         * Handles the Refresh action, reloading data for the current view.
         */
        onRefresh: function () {
            MessageToast.show("Refresh triggered, reloading data.");
        }
  });
});
