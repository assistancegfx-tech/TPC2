import { RegistrationFormData, SubmissionResult } from '../types';

const SPREADSHEET_TITLE = 'Textile Presentation Competition 2026';
const SHEET_TAB_NAME = 'Registrations';
const DRIVE_ROOT_FOLDER = 'Textile Presentation Competition 2026';

const HEADERS = [
  'Registration ID',
  'Submission Date & Time',
  'Payment Status',
  'Group Leader Name',
  'Group Leader Roll',
  'Group Leader Department',
  'Group Leader WhatsApp',
  'Group Leader Facebook',
  'Group Leader Photo URL',
  'Member 1 Name',
  'Member 1 Roll',
  'Member 1 Department',
  'Member 1 WhatsApp',
  'Member 1 Facebook',
  'Member 1 Photo URL',
  'Member 2 Name',
  'Member 2 Roll',
  'Member 2 Department',
  'Member 2 WhatsApp',
  'Member 2 Facebook',
  'Member 2 Photo URL',
  'bKash Number',
  'Transaction ID'
];

/**
 * Finds or creates the designated spreadsheet on user's Google Drive.
 */
async function getOrCreateSpreadsheet(accessToken: string): Promise<string> {
  // 1. Search for existing spreadsheet
  const query = encodeURIComponent(`name = '${SPREADSHEET_TITLE}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`);
  const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!searchRes.ok) {
    const err = await searchRes.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to search Google Drive for spreadsheet');
  }

  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    const spreadsheetId = searchData.files[0].id;
    await ensureSheetTabAndHeaders(accessToken, spreadsheetId);
    return spreadsheetId;
  }

  // 2. Create new spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: { title: SPREADSHEET_TITLE },
      sheets: [
        {
          properties: {
            title: SHEET_TAB_NAME,
            gridProperties: { frozenRowCount: 1 }
          }
        }
      ]
    })
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to create Google Spreadsheet');
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;

  // Insert Header row with formatting
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_TAB_NAME}!A1:W1?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      range: `${SHEET_TAB_NAME}!A1:W1`,
      majorDimension: 'ROWS',
      values: [HEADERS]
    })
  });

  return spreadsheetId;
}

/**
 * Ensures tab exists and has headers
 */
async function ensureSheetTabAndHeaders(accessToken: string, spreadsheetId: string) {
  const getSheetRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!getSheetRes.ok) return;
  const sheetMeta = await getSheetRes.json();
  const hasTab = sheetMeta.sheets?.some((s: any) => s.properties?.title === SHEET_TAB_NAME);

  if (!hasTab) {
    // Add sheet tab
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          {
            addSheet: {
              properties: {
                title: SHEET_TAB_NAME,
                gridProperties: { frozenRowCount: 1 }
              }
            }
          }
        ]
      })
    });
  }

  // Check header row
  const valuesRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_TAB_NAME}!A1:W1`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  const valuesData = await valuesRes.json();
  if (!valuesData.values || valuesData.values.length === 0) {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_TAB_NAME}!A1:W1?valueInputOption=USER_ENTERED`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        range: `${SHEET_TAB_NAME}!A1:W1`,
        majorDimension: 'ROWS',
        values: [HEADERS]
      })
    });
  }
}

/**
 * Gets or creates folder on Google Drive
 */
async function getOrCreateDriveFolder(accessToken: string, folderName: string, parentId?: string): Promise<string> {
  let query = `mimeType = 'application/vnd.google-apps.folder' and name = '${folderName}' and trashed = false`;
  if (parentId) {
    query += ` and '${parentId}' in parents`;
  }
  const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (searchRes.ok) {
    const data = await searchRes.json();
    if (data.files && data.files.length > 0) {
      return data.files[0].id;
    }
  }

  // Create folder
  const folderMetadata: any = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder'
  };
  if (parentId) {
    folderMetadata.parents = [parentId];
  }

  const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(folderMetadata)
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to create Drive folder ${folderName}`);
  }

  const folder = await createRes.json();
  return folder.id;
}

/**
 * Uploads a base64 photo to Google Drive
 */
async function uploadPhotoToDrive(
  accessToken: string,
  base64Data: string,
  fileName: string,
  folderId: string
): Promise<string> {
  const commaIndex = base64Data.indexOf(',');
  const mimeMatch = base64Data.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const pureBase64 = commaIndex > -1 ? base64Data.slice(commaIndex + 1) : base64Data;

  const binaryString = window.atob(pureBase64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: mimeType });

  const metadata = {
    name: fileName,
    parents: [folderId]
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', blob);

  const uploadRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,webContentLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: form
  });

  if (!uploadRes.ok) {
    const err = await uploadRes.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to upload ${fileName} to Drive`);
  }

  const fileData = await uploadRes.json();
  return fileData.webViewLink || `https://drive.google.com/file/d/${fileData.id}/view`;
}

/**
 * Main registration submission orchestrator
 */
export async function submitRegistrationToGoogleWorkspace(
  accessToken: string,
  formData: RegistrationFormData
): Promise<SubmissionResult> {
  try {
    // 1. Get or Create Spreadsheet
    const spreadsheetId = await getOrCreateSpreadsheet(accessToken);

    // 2. Check existing records for duplicate Roll Numbers and Transaction ID
    const readRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_TAB_NAME}!A:W`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!readRes.ok) {
      const err = await readRes.json().catch(() => ({}));
      throw new Error(err.error?.message || 'Failed to read Google Sheet records');
    }

    const sheetData = await readRes.json();
    const rows: string[][] = sheetData.values || [];

    const glRoll = formData.groupLeader.rollNumber.trim().toLowerCase();
    const m1Roll = formData.member1.rollNumber.trim().toLowerCase();
    const m2Roll = formData.member2.rollNumber.trim().toLowerCase();
    const cleanTrxId = formData.transactionId.trim().toLowerCase();

    // Skip header row
    const existingRows = rows.slice(1);
    let maxIdNumber = 0;

    for (const row of existingRows) {
      const regId = row[0] || '';
      const rowGlRoll = (row[4] || '').trim().toLowerCase();
      const rowM1Roll = (row[10] || '').trim().toLowerCase();
      const rowM2Roll = (row[16] || '').trim().toLowerCase();
      const rowTrxId = (row[22] || '').trim().toLowerCase();

      // Check duplicates
      const submittedRolls = [glRoll, m1Roll, m2Roll];
      const rowRolls = [rowGlRoll, rowM1Roll, rowM2Roll].filter(Boolean);

      for (const r of submittedRolls) {
        if (rowRolls.includes(r)) {
          return {
            success: false,
            error: `Participant roll number "${r.toUpperCase()}" has already been registered in another team.`
          };
        }
      }

      if (rowTrxId && rowTrxId === cleanTrxId) {
        return {
          success: false,
          error: `bKash Transaction ID "${formData.transactionId}" has already been used for registration.`
        };
      }

      // Track registration IDs
      const match = regId.match(/TEX2026-(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num) && num > maxIdNumber) {
          maxIdNumber = num;
        }
      }
    }

    // 3. Generate Sequential Unique Registration ID
    const nextSeq = (maxIdNumber + 1).toString().padStart(3, '0');
    const registrationId = `TEX2026-${nextSeq}`;

    // 4. Create Drive Root Folder & Team Subfolder
    const rootFolderId = await getOrCreateDriveFolder(accessToken, DRIVE_ROOT_FOLDER);
    const teamFolderId = await getOrCreateDriveFolder(accessToken, registrationId, rootFolderId);

    // 5. Upload Participant Photos
    const glPhotoUrl = await uploadPhotoToDrive(
      accessToken,
      formData.groupLeader.photoBase64,
      'Group Leader.jpg',
      teamFolderId
    );

    const m1PhotoUrl = await uploadPhotoToDrive(
      accessToken,
      formData.member1.photoBase64,
      'Member 1.jpg',
      teamFolderId
    );

    const m2PhotoUrl = await uploadPhotoToDrive(
      accessToken,
      formData.member2.photoBase64,
      'Member 2.jpg',
      teamFolderId
    );

    // 6. Format Date & Timestamp
    const now = new Date();
    const submissionDateTime = now.toLocaleString('en-US', {
      timeZone: 'Asia/Dhaka',
      dateStyle: 'medium',
      timeStyle: 'medium'
    }) + ' (BST)';

    // 7. Append Row to Google Sheet
    const newRow = [
      registrationId,
      submissionDateTime,
      'Pending',
      // Group Leader
      formData.groupLeader.fullName.trim(),
      formData.groupLeader.rollNumber.trim(),
      formData.groupLeader.department.trim(),
      formData.groupLeader.whatsappNumber.trim(),
      formData.groupLeader.facebookUrl.trim(),
      glPhotoUrl,
      // Member 1
      formData.member1.fullName.trim(),
      formData.member1.rollNumber.trim(),
      formData.member1.department.trim(),
      formData.member1.whatsappNumber.trim(),
      formData.member1.facebookUrl.trim(),
      m1PhotoUrl,
      // Member 2
      formData.member2.fullName.trim(),
      formData.member2.rollNumber.trim(),
      formData.member2.department.trim(),
      formData.member2.whatsappNumber.trim(),
      formData.member2.facebookUrl.trim(),
      m2PhotoUrl,
      // Payment
      formData.bkashNumber.trim(),
      formData.transactionId.trim()
    ];

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_TAB_NAME}!A:W:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          range: `${SHEET_TAB_NAME}!A:W`,
          majorDimension: 'ROWS',
          values: [newRow]
        })
      }
    );

    if (!appendRes.ok) {
      const err = await appendRes.json().catch(() => ({}));
      throw new Error(err.error?.message || 'Failed to append registration data into Google Sheets');
    }

    return {
      success: true,
      registrationId,
      timestamp: submissionDateTime,
      spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
      driveFolderUrl: `https://drive.google.com/drive/folders/${teamFolderId}`
    };
  } catch (error: any) {
    console.error('Error in submitRegistrationToGoogleWorkspace:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during submission. Please try again.'
    };
  }
}
