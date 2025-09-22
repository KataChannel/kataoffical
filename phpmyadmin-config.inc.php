<?php
/**
 * Custom phpMyAdmin configuration to fix deployment issues
 * This file addresses session, header, and upload limit problems
 */

/* Authentication type */
$cfg['Servers'][1]['auth_type'] = 'cookie';
$cfg['Servers'][1]['host'] = 'mysql';
$cfg['Servers'][1]['port'] = 3306;
$cfg['Servers'][1]['connect_type'] = 'tcp';
$cfg['Servers'][1]['compress'] = false;
$cfg['Servers'][1]['AllowNoPassword'] = false;

/* Security settings */
$cfg['blowfish_secret'] = 'rausachsite-phpmyadmin-secret-key-2024-deployment';
$cfg['DefaultLang'] = 'en';
$cfg['ServerDefault'] = 1;

/* Upload settings to handle large files */
$cfg['UploadDir'] = '/tmp';
$cfg['SaveDir'] = '/tmp';
$cfg['MaxSizeForInputField'] = '50MiB';
$cfg['LongtextDoubleTextarea'] = true;
$cfg['TextareaRows'] = 20;
$cfg['TextareaCols'] = 40;

/* Session configuration to prevent session_start errors */
$cfg['SessionSavePath'] = '/tmp';
$cfg['CheckConfigurationPermissions'] = false;

/* Memory and execution limits */
$cfg['ExecTimeLimit'] = 300;
$cfg['MemoryLimit'] = '512M';

/* Prevent timeout issues */
$cfg['LoginCookieValidity'] = 3600;
$cfg['LoginCookieStore'] = 3600;

/* Fix for headers already sent issue */
$cfg['SendErrorReports'] = 'never';
$cfg['ConsoleEnterExecutes'] = false;

/* Database connection settings */
$cfg['Servers'][1]['user'] = 'tazaspac_chikiet';
$cfg['Servers'][1]['password'] = '@Hikiet88';
$cfg['Servers'][1]['only_db'] = 'tazaspac_chikiet';

/* Import/Export settings */
$cfg['Import']['charset'] = 'utf-8';
$cfg['MaxRows'] = 100;
$cfg['Order'] = 'ASC';
$cfg['Protect_Binary'] = 'blob';
$cfg['ShowBlob'] = false;
$cfg['ShowAll'] = false;

/* Zip compression for exports */
$cfg['ZipDump'] = true;
$cfg['GZipDump'] = true;
$cfg['BZipDump'] = true;

/* Navigation settings */
$cfg['NavigationTreePointerEnable'] = true;
$cfg['BrowsePointerEnable'] = true;
$cfg['BrowseMarkerEnable'] = true;

/* Grid editing */
$cfg['GridEditing'] = 'click';
$cfg['SaveCellsAtOnce'] = false;

/* SQL history */
$cfg['QueryHistoryMax'] = 100;

/* Designer settings */
$cfg['RelationDisplayColumn'] = 'display_field';